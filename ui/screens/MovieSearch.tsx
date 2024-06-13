import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import movieSearchStyles from '../styles/movieSearchStyles';
import { faAngleLeft, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation, StackActions } from '@react-navigation/native';
import COLORS from '../styles/Theme';
import MovieCard from '../components/atoms/MovieCard';
import axios from 'axios';
import {FiltterModal} from "../components/organisms/FiltterModal"
import ConnectionStatus from '../assets/ConnectionStatus';
import Routes from '../../Navigation/Routes';
import { Global } from '../../Constants';

const { width, height } = Dimensions.get('window');

const MovieSearch = () => {
  const [userInput, setUserInput] = useState('');
  const [showLogo, setShowLogo] = useState(true);
  const [showNoResults, setShowNoResults] = useState(false);
  const [showMovies, setShowMovies] = useState(false);
  const [movies, setMovies] = useState<Array<any>>([]);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);
  const [showFiltter, setShowFiltter] = useState(false);
  const [releaseSort, setReleaseSort] = useState<string|null>(null);
  const [qualificationSort, setQualificationSort] = useState<string|null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userInput) {
        setPage(1);
        setMovies([]);
        getMovies(userInput, 1,releaseSort,qualificationSort);
      } else {
        setShowLogo(true);
        setShowNoResults(false);
        setShowMovies(false);
        setMovies([]);
        setHasMorePages(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [userInput,releaseSort,qualificationSort]);

  const handleSave = (release:string|null,qualification:string|null) => {
    setReleaseSort(release);
    setQualificationSort(qualification);
    setPage(1);
    setMovies([]); 
  };
  const handleUrl = (page: number, release: string|null, qualification: string|null) => {
    const encodedUserInput = encodeURIComponent(userInput);
    let url = Global.BASE_URL+`/movies?query=${encodedUserInput}&page=${page}`
    if(release){
      url += `&release_sort=${release}`;
    }
    if(qualification){
      url += `&qualification_sort=${qualification}`;
    }
    return url;
  }

  const getMovies = async (userInput: string, page: number, release: string|null, qualification: string|null) => {

      if (userInput.length < 2) {
        setShowLogo(true);
        setShowNoResults(false);
        setShowMovies(false);
        setMovies([]);
      } 
      else {  
        try {
          let url = handleUrl(page, release,qualification)
          let connectionStatus = await ConnectionStatus()
          if(!connectionStatus){
            navigation.dispatch(StackActions.replace(Routes.InternetError));
          }
          const response = await axios.get(url);
          const movies = response.data
          if(movies.constructor === Array){
            setMovies((prevMovies) => [...prevMovies, ...movies]);
            setHasMorePages(movies.length == 20);
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
              <TouchableOpacity onPress={() => setShowFiltter(true)}>
                <FontAwesomeIcon icon={faFilter} size={24} color={COLORS.white}/>
              </TouchableOpacity>
          </View>
          <View style={{flex: 18, alignItems:'center'}}>
            <FlatList
              data={movies}
              keyExtractor={(item) => item['id']}
              numColumns={3}
              renderItem={({ item }) => <MovieCard movie={{ id: item['id'], title: item['title'], default_poster: item['default_poster']}} />}
              contentContainerStyle={{gap: height * 0.024 }}
              columnWrapperStyle={{ gap: width * 0.0512 }}
              onEndReached={() => {
                if (userInput && hasMorePages){
                  setPage((prevPage) => prevPage + 1);
                  getMovies(userInput, page + 1,releaseSort,qualificationSort);
                }
              }}
              onEndReachedThreshold={0.5}
            />
          </View>
          <FiltterModal
            isVisible={showFiltter}
            onSave={handleSave}
            actionButton={{
              onPress: () => setShowFiltter(false)
            }}
            closeButton={{
              close: () => setShowFiltter(false)
            }}
            >  
          </FiltterModal>
      </View>
      )}
    </SafeAreaView>
  );
};
export default MovieSearch;