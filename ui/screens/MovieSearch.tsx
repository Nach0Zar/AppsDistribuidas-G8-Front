import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import movieSearchStyles from '../styles/movieSearchStyles';
import { faAngleLeft, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native';
import COLORS from '../styles/Theme';
import MovieCard from '../components/atoms/MovieCard';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const MovieSearch = () => {
  const [userInput, setUserInput] = useState('');
  const [showLogo, setShowLogo] = useState(true);
  const [showNoResults, setShowNoResults] = useState(false);
  const [showMovies, setShowMovies] = useState(false);
  const [movies, setMovies] = useState<Array<any>>([]);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
 
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userInput) {
        setPage(1);
        getMovies(userInput, 1);
      } else {
        setShowLogo(true);
        setShowNoResults(false);
        setShowMovies(false);
        setMovies([]);
        setHasMorePages(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [userInput]);

  const getMovies = async (userInput: string, page: number) => {

      if (userInput.length < 2) {
        setShowLogo(true);
        setShowNoResults(false);
        setShowMovies(false);
        setMovies([]);
        setHasMorePages(true);

      } 
      else {  
        try {
          const encodedUserInput = encodeURIComponent(userInput);
          const response = await axios.get(`https://apps-distribuidas-grupo-8.onrender.com/api/movies?query=${encodedUserInput}&page=${page}`);
          const movies = response.data

          if(movies.constructor === Array){
            setMovies((prevMovies) => [...prevMovies, ...movies]);
            setHasMorePages(true);
          } 
          else {
            let moviesList = []
            moviesList[0] = movies
            setMovies(moviesList)
            setHasMorePages(false);
          }

          setShowNoResults(false);
          setShowMovies(true);
          setShowLogo(false);

        } 
        catch(error) {
          setHasMorePages(false);

          if(page === 1 ){
            setShowNoResults(true);
            setShowLogo(false);
            setShowMovies(false);
          }
        } 
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
          onChangeText={(userInput) => setUserInput(userInput)}
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
              keyExtractor={(item) => item['id']}
              numColumns={3}
              renderItem={({ item }) => <MovieCard movie={{ id: item['id'], title: item['title'], default_poster: item['default_poster'] }} />}
              contentContainerStyle={{gap: height * 0.024 }}
              columnWrapperStyle={{ gap: width * 0.0512 }}
              onEndReached={() => {
                if (userInput && hasMorePages){
                  setPage((prevPage) => prevPage + 1);
                  getMovies(userInput, page + 1);
                }
              }}
              onEndReachedThreshold={0.5}
            />
          </View>
      </View>
      )}
    </SafeAreaView>
  );
};
export default MovieSearch;