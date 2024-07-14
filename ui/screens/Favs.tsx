import React, { useState, useEffect } from 'react';
import { View, Text,Image, TextInput, StyleSheet, ActivityIndicator, SafeAreaView, FlatList, Dimensions } from 'react-native';
import favsStyles from '../styles/favsStyles';
import { useNavigation, StackActions } from '@react-navigation/native';
import MovieCard from '../components/atoms/MovieCard';
import axios from 'axios';
import ConnectionStatus from '../assets/ConnectionStatus';
import Routes from '../../Navigation/Routes';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import { Global } from '../../Constants';
import { COLOR } from '../styles/Theme';

const { width, height } = Dimensions.get('window');

const Favs = () => {
  const [showMovies, setShowMovies] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const [movies, setMovies] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => { 
    setLoading(true);
    try {
      let url = Global.BASE_URL+`/users/favorites`
      let connectionStatus = await ConnectionStatus()
      if(!connectionStatus){
        navigation.dispatch(StackActions.replace(Routes.InternetError));
      }
      const response = await axios.get(url);
      const movies = response.data
      if(movies.constructor === Array){
        setMovies((prevMovies) => [...prevMovies, ...movies]);
      } 
      else {
        let moviesList = []
        moviesList[0] = movies
        setMovies(moviesList)
      }
      setShowNoResults(false);
      setShowMovies(true);
    } 
    catch(error) {
      setShowNoResults(true);
      setShowMovies(false);
    }
    setLoading(false);
};

  return (
    <SafeAreaView style={favsStyles.container}>
      <View style={favsStyles.header}>
        <TextInput 
          style={favsStyles.input}
          placeholder="Ingrese nombre de pelicula o actor..."
          onPress={() => navigation.navigate(Routes.MovieSearchScreen)}
        />
      </View>
      {loading && (
        <View style={favsStyles.loadingContainer}>
          <ActivityIndicator size="large" color={COLOR.secondBackground} style={favsStyles.activityIndicator} />
        </View>
      )}
      {showNoResults && (
        <View style={favsStyles.noResultsContainer}>
          <Text style={favsStyles.noResultsText}>No se encontraron resultados!</Text>
          <Text style={favsStyles.noResultsSubtitle}>Intenta agregar una pelicula a favoritos</Text>
          <Image
            source={require('../../assets/images/logo.png')}
            style={favsStyles.image}
          />
        </View>
      )}
      {showMovies && (
        <View style={{flex:1}}>
          <View style={favsStyles.title}>
              <Text style={favsStyles.titleText}>Peliculas Favoritas</Text>
          </View>
          <View style={{flex: 18, alignItems:'center'}}>
            <FlatList
              data={movies}
              keyExtractor={(item) => item['id']}
              numColumns={3}
              renderItem={({ item }) => <MovieCard movie={{ id: item['id'], title: item['title'], default_poster: item['default_poster']}} />}
              contentContainerStyle={{gap: height * 0.024 }}
              columnWrapperStyle={{ gap: width * 0.0512 }}
            />
          </View>
      </View>
      )}
    </SafeAreaView>
  );
};

export default Favs;