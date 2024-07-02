import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { COLOR } from '../styles/Theme';
import ConnectionStatus from '../assets/ConnectionStatus';
import { useNavigation, StackActions } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';
import axios from 'axios';
import { Global } from '../../Constants';

export interface MovieProps {
  route: {
    params: {
      id: String
    }
  }
}

interface Genre {
  id: String,
  name: String
}

interface Comment {
  userID: String,
  message: String,
  date: String,
  qualification: number,
  id: String
}

interface Person {
  name: String,
  department: String
}

interface Movie {
  id: String,
  title: String,
  subtitle: String,
  synopsis: String,
  genre: Genre,
  images: Array<String>,
  videos: Array<String>,
  release_date: String,
  duration: number,
  qualification: number,
  qualifiers: number,
  cast: Array<Person>,
  crew: Array<Person>,
  comments: Array<Comment>
}

const Details = (props: MovieProps) => {
  const navigation = useNavigation();
  const [loadedMovie, setLoadedMovie] = useState<boolean>(false);
  const [movie, setMovie] = useState<Movie|null>(null);
  const { id } = props.route.params;
  useEffect(() => {
    const getMovieInformation = async () => {
      let connectionStatus = await ConnectionStatus();
      if(!connectionStatus){
        navigation.dispatch(StackActions.replace(Routes.InternetError));
      }
      const url = Global.BASE_URL+`/movies/${id}`
      const response = await axios.get(url);
      const movieData = response.data;
      let crew:Person[] = [], cast:Person[] = [], comments:Comment[] = [];
      movieData.cast.forEach((castMember: any) => {
        cast.push({
          name: castMember.name,
          department: castMember.department
        });
      });
      movieData.crew.forEach((crewMember: any) => {
        crew.push({
          name: crewMember.name,
          department: crewMember.department
        });
      });
      movieData.comments.forEach((comment: any) => {
        comments.push({
          userID: comment.userID,
          message: comment.message,
          date: comment.date,
          qualification: comment.qualification,
          id: comment.id
        });
      });
      setMovie({
        id: movieData.id,
        title: movieData.title,
        subtitle: movieData.subtitle,
        synopsis: movieData.synopsis,
        genre: movieData.genre,
        images: movieData.images,
        videos: movieData.videos,
        release_date: movieData.release_date,
        duration: movieData.duration,
        qualification: movieData.qualification,
        qualifiers: movieData.qualifiers,
        cast: cast,
        crew: crew,
        comments: comments
      })
      setLoadedMovie(true)
    }
    if(!loadedMovie){
      getMovieInformation();
    }
  }, [loadedMovie]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.primaryBackground }}>
      {loadedMovie ? <Text>Details Screen {movie!.title}</Text> : <Text>Details Screen {props.route.params.id}</Text>}
    </View>
  );
};

export default Details;