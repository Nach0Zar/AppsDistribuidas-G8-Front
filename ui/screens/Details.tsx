import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ToastAndroid,
  Pressable,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import {COLOR} from '../styles/Theme';
import ConnectionStatus from '../assets/ConnectionStatus';
import {useNavigation, StackActions, useIsFocused} from '@react-navigation/native';
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
import {faHeart as regularHeart} from '@fortawesome/free-regular-svg-icons';
import COLORS from '../styles/Theme';
import {useSelector, useDispatch} from 'react-redux';
import {
  logout,
  setUserToken,
  updateFavoritesList,
} from '../../redux/slices/authSlice';
import InternalError from './errors/InternalError';
import Share from 'react-native-share';
import {useToast} from 'react-native-toast-notifications';
import CustomCarousel from '../components/organisms/CustomCarousel';
import {ImageProperties} from '../models/ImageProperties';
import {Comments} from '../components/organisms/Comments';
import {Cast} from '../components/organisms/Cast';

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
  id: String;
  message: String;
  qualification: number;
  userImage: String;
  username: String;
  date: String;
  userID: String;
  movieID: String;
}

interface Person {
  name: String;
  department: String;
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
  const [favorite, setFavorite] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [showCarousel, setShowCarousel] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>('');
  const toast = useToast();
  const {id} = props.route.params;
  const dispatch = useDispatch();
  const {userInfo, userToken, refreshToken} = useSelector(
    (state: any) => state.auth,
  );
  const isFocused = useIsFocused();
  const loadProfileInfo = async () => {
    navigation.dispatch(StackActions.replace(Routes.HomeScreen));
  };
  const handleShare = async () => {
    let message =
      'Hola! Te comparto esta pelicula llamada ' +
      (movie == null ? 'undefined' : movie!.title);
    const shareOptions: any = {
      title: 'Share via',
      message: message,
    };
    try {
      await Share.open(shareOptions);
      toast.show('Pelicula compartida correctamente!', {
        type: 'success',
        placement: 'bottom',
        duration: 3000,
        animationType: 'slide-in',
      });
    } catch (error: any) {
      let toastMessage;
      let type;
      if (error.toString().includes('User did not share')) {
        toastMessage = 'Compartir pelicula cancelado!';
        type = 'warning';
      } else {
        toastMessage = 'Compartir pelicula fallo!';
        type = 'danger';
      }
      toast.show(toastMessage, {
        type: type,
        placement: 'bottom',
        duration: 3000,
        animationType: 'slide-in',
      });
    }
  };
  const handleRefreshToken = async () => {
    try {
      let connectionStatus = await ConnectionStatus();
      if (!connectionStatus) {
        navigation.dispatch(StackActions.replace(Routes.InternetError));
      }
      const refreshTokenResponse = await axios.put(Global.BASE_URL + '/auths', {
        headers: {
          Authorization: refreshToken,
          'Content-Type': 'application/json',
        },
      });
      if (refreshTokenResponse.status === 200) {
        dispatch(setUserToken(refreshTokenResponse));
      }
    } catch (error) {
      dispatch(logout());
    }
  };
  const handleFavorite = async () => {
    let connectionStatus = await ConnectionStatus();
    if (!connectionStatus) {
      navigation.dispatch(StackActions.replace(Routes.InternetError));
    }
    setFavorite(!favorite);
    try {
      let response;
      if (!favorite) {
        response = await axios.post(
          Global.BASE_URL + '/users/favorites/' + id,
          {},
          {
            headers: {
              Authorization: userToken,
              'Content-Type': 'application/json',
            },
          },
        );
      } else {
        response = await axios.delete(
          Global.BASE_URL + '/users/favorites/' + id,
          {
            headers: {
              Authorization: userToken,
              'Content-Type': 'application/json',
            },
          },
        );
      }
      let newList: any[] = [];
      response.data.forEach((movie: any) => {
        newList.push(movie.id);
      });
      dispatch(updateFavoritesList(newList));
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        handleRefreshToken();
      } else {
        setError(true);
        setErrorMessage(
          `Mensaje: ${error.message} \nCodigo de error:  ${error.code}`,
        );
      }
    }
  };

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
        userID: comment.userId,
        message: comment.message,
        date: comment.date,
        qualification: comment.qualification,
        id: comment.id,
        movieID: id,
        userImage: '',
        username: '',
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
    userInfo.favorites?.includes(id) && setFavorite(true);
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

  useEffect(() => {
    if(isFocused) {
      getMovieInformation();
    }
  }, [isFocused])

  useEffect(() => {
    getMovieInformation();
  }, [loadedMovie, favorite, error, showCarousel, refreshData]);

  const [activeTab, setActiveTab] = useState('Reparto');

  return (
    <>
      {!error ? (
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
                <TouchableOpacity onPress={() => handleFavorite()}>
                  <FontAwesomeIcon
                    icon={favorite ? faHeart : regularHeart}
                    size={24}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShare()}>
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
            <View style={detailsStyle.container}>
              <View style={detailsStyle.imageContainer}>
                <Pressable
                  onPress={() => {
                    setShowCarousel(true);
                  }}>
                  <Image
                    source={{
                      uri:
                        'https://image.tmdb.org/t/p/original' +
                        movie!.default_poster.file_path,
                    }}
                    style={detailsStyle.image}
                  />
                </Pressable>
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

              <CustomCarousel
                images={movie!.images}
                videos={movie!.videos}
                isVisible={showCarousel}
                onClose={() => {
                  setShowCarousel(false);
                }}
              />

              <View style={detailsStyle.commentsAndPeopleContainer}>
                <View style={styles.tabContainer}>
                  <TouchableOpacity onPress={() => setActiveTab('Reparto')}>
                    <Text
                      style={[
                        styles.tab,
                        activeTab === 'Reparto' && styles.activeTab,
                      ]}>
                      Reparto
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setActiveTab('Comentarios')}>
                    <Text
                      style={[
                        styles.tab,
                        activeTab === 'Comentarios' && styles.activeTab,
                      ]}>
                      Comentarios
                    </Text>
                  </TouchableOpacity>
                </View>
                {activeTab === 'Reparto' ? (
                  <Cast crew={movie!.crew} cast={movie!.cast} />
                ) : (
                  <Comments movieId={movie?.id} comments={movie!.comments} />
                )}
              </View>
            </View>
          ) : (
            <ActivityIndicator
              size="large"
              color={COLOR.second}
              style={{flex: 1}}
            />
          )}
        </SafeAreaView>
      ) : (
        <View style={{flex: 1}}>
          <InternalError onButtonClick={loadProfileInfo} />
        </View>
      )}
    </>
  );
};

// Estilos
const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  tab: {
    fontSize: 18,
    color: 'gray',
    paddingBottom: 5,
  },
  activeTab: {
    color: COLOR.second,
    borderBottomWidth: 2,
    borderBottomColor: COLOR.primary,
  },
});

export default Details;
