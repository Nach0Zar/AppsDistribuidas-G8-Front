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
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

interface Genre {
  id: string;
  name: string;
}

interface Movie {
  id: string;
  title: string;
  default_poster: any;
}

const Home = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [thrillerMovies, setThrillerMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);

  useEffect(() => {
    fetchLanding();
  }, []);

  useEffect(() => {
    setPage(1);
    if (selectedGenre) {
      setMovies([]);
      getMovies(selectedGenre, 1);
    } 
  }, [selectedGenre, genres]);

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
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchLanding = async () => {
    setIsLoading(true);
    await fetchGenres(); //fetching genres

    try {
      //fetching new movies
      const url = `${Global.BASE_URL}/movies?release_sort=release.desc&quantity=10`;
      const response = await axios.get(url);
      setNewMovies(response.data);
    } catch (error) {
      console.error('Error fetching new movies:', error);
    }
    //fetching movies for comedy, drama and thriller
    const landingGenres = [
      { id: '6647569ea016595c56fef138', name: 'Comedy', setter: setComedyMovies },
      { id: '6647569fa016595c56fef13c', name: 'Drama', setter: setDramaMovies },
      { id: '664756aca016595c56fef170', name: 'Thriller', setter: setThrillerMovies },
    ];

    for (const genre of landingGenres) {
      try {
        const url = `${Global.BASE_URL}/movies?genre=${genre.id}&quantity=10`;
        const response = await axios.get(url);
        genre.setter(response.data);
      } catch (error) {
        console.error(`Error fetching ${genre.name} movies:`, error);
      }
    }
    setIsLoading(false);
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

  const renderMovieSection = (title: string, movies: Movie[]) => (
    <View style={homeStyles.genreSection}>
      <Text style={homeStyles.genreTitle}>{title}</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MovieCard
            movie={{
              id: item.id,
              title: item.title,
              default_poster: item.default_poster,
            }}
          />
        )}
        contentContainerStyle={{ gap: height * 0.024 }}
      />
    </View>
  );

  return (
    <SafeAreaView style={homeStyles.container}>
      <View style={homeStyles.header}>
        <TextInput 
          style={homeStyles.input}
          placeholder="Ingrese nombre de pelicula o actor..."
          onPress={() => navigation.push(Routes.MovieSearchScreen)}
        />
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={COLOR.second} />
        </View>
      ) : (
        <>
          <View style={homeStyles.genreChipsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {genres.map(renderGenreChip)}
            </ScrollView>
          </View>
          <View style={{flex: 1}}>
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
              <FlatList
                data={[
                  { key: 'new', title: "Nuevas Peliculas", movies: newMovies },
                  { key: 'comedy', title: "Comedy", movies: comedyMovies },
                  { key: 'drama', title: "Drama", movies: dramaMovies },
                  { key: 'thriller', title: "Thriller", movies: thrillerMovies },
                ]}
                renderItem={({ item }) => renderMovieSection(item.title, item.movies)}
                keyExtractor={(item) => item.key}
              />
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;