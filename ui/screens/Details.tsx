import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {COLOR} from '../styles/Theme';
import ConnectionStatus from '../assets/ConnectionStatus';
import {useNavigation, StackActions} from '@react-navigation/native';
import Routes from '../../Navigation/Routes';
import axios from 'axios';
import {Global} from '../../Constants';
import detailsStyle from '../styles/detailsStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleLeft,
  faHeart,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import COLORS from '../styles/Theme';
import {TabViewExample} from '../../Navigation/DetailsNavigation';

export interface MovieProps {
  route: {
    params: {
      id: String;
    };
  };
}

interface Genre {
  id: String;
  name: String;
}

export interface Comment {
  id: String,
  message: String,
  qualification: number,
  userImage : String,
  username : String,
  date : String,
  userID : String
}

interface Person {
  name: String;
  department: String;
}
interface ImageProperties {
  aspect_ratio: number;
  height: number;
  width: number;
  file_path: String;
}
interface Movie {
  id: String;
  title: String;
  subtitle: String;
  synopsis: String;
  genre: Genre;
  default_poster: ImageProperties;
  images: Array<ImageProperties>;
  videos: Array<String>;
  release_date: String;
  duration: String;
  qualification: number;
  qualifiers: number;
  cast: Array<Person>;
  crew: Array<Person>;
  comments: Array<Comment>;
}

const Details = (props: MovieProps) => {
  const navigation = useNavigation();
  const [loadedMovie, setLoadedMovie] = useState<boolean>(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const {id} = props.route.params;
  useEffect(() => {
    const getMovieInformation = async () => {
      let connectionStatus = await ConnectionStatus();
      if (!connectionStatus) {
        navigation.dispatch(StackActions.replace(Routes.InternetError));
      }
      const url = Global.BASE_URL + `/movies/${id}`;
      const response = await axios.get(url);
      const movieData = response.data;
      let crew: Person[] = [],
        cast: Person[] = [],
        comments: Comment[] = [],
        images: ImageProperties[] = [];
      movieData.cast.forEach((castMember: any) => {
        cast.push({
          name: castMember.name,
          department: castMember.department,
        });
      });
      movieData.crew.forEach((crewMember: any) => {
        crew.push({
          name: crewMember.name,
          department: crewMember.department,
        });
      });
      movieData.comments.forEach((comment: any) => {
        comments.push({
          userID: comment.userID,
          message: comment.message,
          date: comment.date,
          qualification: comment.qualification,
          id: comment.id,
          userImage: '',
          username : ''
        });
      });
      movieData.images.forEach((image: any) => {
        images.push({
          aspect_ratio: image.aspect_ratio,
          height: image.height,
          width: image.width,
          file_path: image.file_path,
        });
      });
      let duration;
      if (movieData.duration > 59) {
        if (movieData.duration % 60 == 0) {
          duration = Math.floor(movieData.duration / 60) + 'h ';
        } else {
          duration =
            Math.floor(movieData.duration / 60) +
            'h ' +
            (movieData.duration % 60) +
            ' min';
        }
      } else {
        duration = movieData.duration + ' min';
      }
      let release_year = movieData.release_date.substring(0, 4);

      setMovie({
        id: movieData.id,
        title: movieData.title,
        subtitle: movieData.subtitle,
        synopsis: movieData.synopsis,
        genre: movieData.genre,
        default_poster: movieData.default_poster,
        images: images,
        videos: movieData.videos,
        release_date: release_year,
        duration: duration,
        qualification: movieData.qualification,
        qualifiers: movieData.qualifiers,
        cast: cast,
        crew: crew,
        comments: comments,
      });
      setLoadedMovie(true);
    };
    if (!loadedMovie) {
      getMovieInformation();
    }
  }, [loadedMovie]);

  return (
    <SafeAreaView style={detailsStyle.container}>
      <View style={detailsStyle.header}>
        <View style={{flex: 1, flexBasis: '65%'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              size={24}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
        {loadedMovie && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity>
              <FontAwesomeIcon icon={faHeart} size={24} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesomeIcon
                icon={faShareNodes}
                size={24}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {loadedMovie ? (
        /*
    <View style={detailsStyle.container}>
      <View style={detailsStyle.imageContainer}>
        <Image source={{uri: "https://image.tmdb.org/t/p/original" + movie!.default_poster.file_path}} style={detailsStyle.image}/>
      </View>
      <View style={detailsStyle.detailsContainer}>
        <Text style={detailsStyle.title}>{movie!.title}</Text>
        <Text style={detailsStyle.subtitle}>{movie!.subtitle}</Text>
        <View style={detailsStyle.labelContainer}>
          <Text style={detailsStyle.label}>{movie!.release_date}</Text>
          <Text style={detailsStyle.label}>|</Text>
          <Text style={detailsStyle.label}>{movie!.duration}</Text>
          <Text style={detailsStyle.label}>|</Text>
          <Text style={detailsStyle.label}>{movie!.genre.name}</Text>
          <Text style={detailsStyle.label}>|</Text>
          <Text style={detailsStyle.label}>{movie!.qualification}({movie!.qualifiers})</Text>
        </View>
        <View
          style={detailsStyle.hr}
        />
        <Text style={detailsStyle.synopsis}>{movie!.synopsis}</Text>
      </View>
      <ScrollView style={detailsStyle.casters}>
        <Text style={detailsStyle.synopsis}>asd</Text>
        
        <TabViewExample />
        
      </ScrollView>
      
    </View>
    */

        <ScrollView style={style.container}>
          <View style={detailsStyle.imageContainer}>
            <Image
              source={{
                uri:
                  'https://image.tmdb.org/t/p/original' +
                  movie!.default_poster.file_path,
              }}
              style={detailsStyle.image}
            />
          </View>
          <View style={detailsStyle.detailsContainer}>
            <Text style={detailsStyle.title}>{movie!.title}</Text>
            <Text style={detailsStyle.subtitle}>{movie!.subtitle}</Text>
            <View style={detailsStyle.labelContainer}>
              <Text style={detailsStyle.label}>{movie!.release_date}</Text>
              <Text style={detailsStyle.label}>|</Text>
              <Text style={detailsStyle.label}>{movie!.duration}</Text>
              <Text style={detailsStyle.label}>|</Text>
              <Text style={detailsStyle.label}>{movie!.genre.name}</Text>
              <Text style={detailsStyle.label}>|</Text>
              <Text style={detailsStyle.label}>
                {movie!.qualification}({movie!.qualifiers})
              </Text>
            </View>
            <View style={detailsStyle.hr} />
            <Text style={detailsStyle.synopsis}>{movie!.synopsis}</Text>
          </View>
          <ScrollView>
            <TabViewExample />
          </ScrollView>
        </ScrollView>
      ) : (
        <ActivityIndicator
          size="large"
          color={COLOR.second}
          style={{flex: 1}}
        />
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primaryBackground,
  },
  container2: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});

export default Details;
