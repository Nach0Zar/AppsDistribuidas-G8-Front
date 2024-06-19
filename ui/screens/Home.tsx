import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Text, ScrollView } from 'react-native';
import homeStyles from '../styles/homeStyles';
import { useNavigation } from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import Routes from '../../Navigation/Routes';
import InternalError from './errors/InternalError';
import { Chip } from 'react-native-paper';

const genres = ['Accion', 'Comedia', 'Drama', 'Romance', 'Terror', 'Suspenso', 'Ciencia Ficcion'];

const Home = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [homeLoaded, setHomeLoaded] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const loadHome = async () => {
    return false;//forzar pagina de error ya que el home no esta hecho
  }
  useEffect(() => {
    if(!homeLoaded){
      loadHome().then(status => {setHomeLoaded((status === null) ? false : status)});
    }
  }, [homeLoaded]);

  const renderGenreChip = (genre:any, index:any) => (
    <Chip
      key={index}
      style={[
        homeStyles.chip,
        selectedGenre === genre ? homeStyles.chipSelected : homeStyles.chipUnselected,
      ]}
      mode={selectedGenre === genre ? 'flat' : 'outlined'}
      textStyle={homeStyles.chipText}
      onPress={() => handleGenre(genre)}
    >
      {genre}
    </Chip>
  );

  const handleGenre = (genre:any) => {
    setSelectedGenre(genre)
  }

  return (
    <SafeAreaView style={homeStyles.container}>
      <View style={homeStyles.header}>
        <TextInput 
          style={homeStyles.input}
          placeholder="Ingrese nombre de pelicula o actor..."
          onPress={() => navigation.push(Routes.MovieSearchScreen)}
        />
      </View>
      <View style={homeStyles.genreChipsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {genres.map(renderGenreChip)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;