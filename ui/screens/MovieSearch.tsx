import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import movieSearchStyles from '../styles/movieSearchStyles';
import { faAngleLeft, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native';
import COLORS from '../styles/Theme';
import MovieCard from '../components/atoms/MovieCard';
import { COLOR } from '../styles/Theme';

const movies = [
  { id: '1', title: 'John Wick 1', image: require('../../assets/images/wick1.jpg') },
  { id: '2', title: 'John Wick 2', image: require('../../assets/images/wick2.jpg') },
  { id: '3', title: 'John Wick 3', image: require('../../assets/images/wick3.jpg') },
  { id: '4', title: 'John Wick 4', image: require('../../assets/images/wick4.jpg') },
];
const { width, height } = Dimensions.get('window');

const MovieSearch = () => {
  const [userInput, setUserInput] = useState('');
  const [showLogo, setShowLogo] = useState(true);
  const [showNoResults, setShowNoResults] = useState(false);
  const [showMovies, setShowMovies] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    getMovies(userInput);
  }, [userInput]);

  const getMovies = async (userInput: string) => {
    try {
      if (userInput.length < 2) {
        setShowLogo(true);
        setShowNoResults(false);
        setShowMovies(false);
      } else {
        setShowLogo(false);
        console.log('traer pelicula');
        //TODO: make api call to get movies. If results, show movies, else show no results
        if(true){
          setShowMovies(true);
        } else {
          setShowNoResults(true);
        }
      }
    } catch (error) {
      console.error('Error al traer las peliculas:', error);
    }
  };
 
  return (
    <SafeAreaView style={movieSearchStyles.container}>
      <View style={movieSearchStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} size={24} color={COLORS.white}/>
        </TouchableOpacity>
        <TextInput
          style={movieSearchStyles.input}
          value={userInput}
          onChangeText={(value) => setUserInput(value)}
          placeholder="Ingrese el nombre de una pelicula o actor..."
        />
      </View>
      {showLogo && (
        <Image
          source={require('../../assets/images/logo.png')}
          style={movieSearchStyles.image}
        />
      )}
      {showNoResults && (
        <View style={movieSearchStyles.noResultsContainer}>
          <Text style={movieSearchStyles.noResultsText}>No se encontraron resultados!</Text>
          <Text style={movieSearchStyles.noResultsSubtitle}>Intenta nuevamente ingresando el nombre de una pelicula o actor</Text>
        </View>
      )}
      {showMovies && (
        <View style={{flex:1}}>
          <View style={movieSearchStyles.title}>
              <Text style={movieSearchStyles.titleText}>Resultados encontrados</Text>
              <FontAwesomeIcon icon={faFilter} size={24} color={COLORS.white}/>
          </View>
          <View style={{flex: 18, alignItems:'center'}}>
            <FlatList
              data={movies}
              keyExtractor={(item) => item.id}
              numColumns={3}
              renderItem={({ item }) => <MovieCard movie={item} />}
              contentContainerStyle={{gap: height * 0.024 }}
              columnWrapperStyle={{ gap: width * 0.0512 }}
            />
          </View>
      </View>
      )}
    </SafeAreaView>
  );
};
export default MovieSearch;