import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Text, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import homeStyles from '../styles/homeStyles';
import { useNavigation } from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import Routes from '../../Navigation/Routes';
import InternalError from './errors/InternalError';
import { Chip } from 'react-native-paper';
import { Global } from '../../Constants';
import axios from 'axios';

const Home = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      let url = Global.BASE_URL+`/genres`
      const response = await axios.get(url);
      console.log(response.data);
      setGenres(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching genres:', error);
      setLoading(false);
    }
  };

  const renderGenreChip = (genre: any) => (
    <Chip
      key={genre.id}
      style={[
        homeStyles.chip,
        selectedGenre === genre.name ? homeStyles.chipSelected : homeStyles.chipUnselected,
      ]}
      mode={selectedGenre === genre ? 'flat' : 'outlined'}
      textStyle={homeStyles.chipText}
      onPress={() => handleGenre(genre.name)}
    >
      {genre.name}
    </Chip>
  );

  const handleGenre = (genre:any) => {
    if(selectedGenre === genre) {
      setSelectedGenre(null);
      console.log(genre)
    } else {
      setSelectedGenre(genre);
      console.log(genre)
    }
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
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {genres.map(renderGenreChip)}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;