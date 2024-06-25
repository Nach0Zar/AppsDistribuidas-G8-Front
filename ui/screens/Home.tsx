import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Text, ScrollView, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import homeStyles from '../styles/homeStyles';
import { useNavigation } from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import Routes from '../../Navigation/Routes';
import InternalError from './errors/InternalError';
import { Chip } from 'react-native-paper';
import { Global } from '../../Constants';
import axios from 'axios';
import MovieCard from '../components/atoms/MovieCard';
import { COLOR } from '../styles/Theme';

const { width, height } = Dimensions.get('window');

const Home = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedGenre, setSelectedGenre] = useState<{ id: string; name: string } | null>(null);
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [movies, setMovies] = useState<Array<any>>([]);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    setPage(1);
    if (selectedGenre) {
      setMovies([]);
      getMovies(selectedGenre, 1);
    }
  }, [selectedGenre]);

  const getMovies = async ( genre:any, page:number ) => {
    try {
      let url = Global.BASE_URL+`/movies?genre=${genre.id}&page=${page}`
      const response = await axios.get(url);
      const movies = response.data;
      setMovies((prevMovies) => [...prevMovies, ...movies]);
      setHasMorePages(movies.length == 20);
      setLoadingMovies(false);
    } 
    catch (error) {
      console.log(error);
      setLoadingMovies(false);
      setHasMorePages(false);
    }
  };

  const fetchGenres = async () => {
    try {
      let url = Global.BASE_URL+`/genres`
      const response = await axios.get(url);
      setGenres(response.data);
      setLoadingGenres(false);
    } catch (error) {
      console.error('Error fetching genres:', error);
      setLoadingGenres(false);
    }
  };

  const renderGenreChip = (genre: any) => (
    <Chip
      key={genre.id}
      style={[
        homeStyles.chip,
        selectedGenre && selectedGenre.name === genre.name  ? homeStyles.chipSelected : homeStyles.chipUnselected,
      ]}
      mode={selectedGenre && selectedGenre.name === genre.name  ? 'flat' : 'outlined'}
      textStyle={homeStyles.chipText}
      onPress={() => handleGenre(genre)}
    >
      {genre.name}
    </Chip>
  );

  const handleGenre = (genre:any) => {
    setLoadingMovies(true);
    if(selectedGenre === genre) {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genre);
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
        {loadingGenres ? (
          <ActivityIndicator size="large" color={COLOR.second} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {genres.map(renderGenreChip)}
          </ScrollView>
        )}
      </View>
      <View>
        {selectedGenre ? (
          <View style={{paddingVertical: 8, alignItems:'center'}}>
            {loadingMovies ? (
              <ActivityIndicator size="large" color={COLOR.second} />
            ) : (
              <FlatList
                data={movies}
                keyExtractor={(item) => item['id']}
                numColumns={3}
                renderItem={({ item }) => <MovieCard movie={{ id: item['id'], title: item['title'], default_poster: item['default_poster']}} />}
                contentContainerStyle={{ gap: height * 0.024 }}
                columnWrapperStyle={{ gap: width * 0.0512 }}
                onEndReached={() => {
                  if ( hasMorePages ){
                    setPage((prevPage) => prevPage + 1);
                    getMovies(selectedGenre, page + 1);
                  }
                }}
                onEndReachedThreshold={0.5}
              />
            )}
        </View>
        ) : (
          <Text>No hay genre seleccionado</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;