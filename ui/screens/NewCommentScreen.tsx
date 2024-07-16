import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS, {COLOR} from '../styles/Theme';
import React, {useEffect, useState} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import detailsStyle from '../styles/detailsStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faPlay} from '@fortawesome/free-solid-svg-icons';
import {Rating} from 'react-native-ratings';
import ConnectionStatus from '../assets/ConnectionStatus';
import Routes from '../../Navigation/Routes';
import axios from 'axios';
import {Global} from '../../Constants';
import {useSelector} from 'react-redux';
import {Comment} from './Details';

interface props {
  route: {
    params: {
      movieId: String;
    };
  };
}

export const NewCommentScreen = ({route}: props) => {
  //TODO: Pendiente postear comentario
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [comment, onChangeComment] = useState<string>('');
  const {userInfo, userToken, refreshToken} = useSelector(
    (state: any) => state.auth,
  );
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserId = async () => {
    try {
      let connectionStatus = await ConnectionStatus();
      if (!connectionStatus) {
        navigation.dispatch(StackActions.replace(Routes.InternetError));
      }
      const response = await axios.get(Global.BASE_URL + '/users', {
        headers: {
          Authorization: userToken,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        return response.data.id;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        //TODO: Hacer refresh
        //handleRefreshToken();
      } else {
        //Error de server?
      }
    }
  };

  const handlePostComment = async () => {
    try {
      setIsLoading(true);
      let connectionStatus = await ConnectionStatus();
      if (!connectionStatus) {
        navigation.dispatch(StackActions.replace(Routes.InternetError));
      }
      const userId = await getUserId();
      const comentario = {
        userId: userId,
        movieId: route.params.movieId,
        message: comment,
        date: new Date().toISOString(),
        qualification: rating
      };
      console.log(comentario)
      if (userId) {
        const response = await axios.post(
          Global.BASE_URL + '/comments',
          comentario,
          {
            headers: {
              Authorization: userToken,
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(comentario)
        if (response.status === 200) {
          navigation.goBack();
          setIsLoading(false);
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        //TODO: Hacer refresh
        setIsLoading(false);
        //handleRefreshToken();
      } else {
        //Error de server?
        
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={detailsStyle.container}>
      <View style={detailsStyle.header}>
        <View style={style.headerContainer}>
          <View style={style.left}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                size={24}
                color={COLORS.white}
              />
            </TouchableOpacity>
            <Text style={style.title}>Agrega tu comentario</Text>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLOR.primary} />
          ) : (
            <TouchableOpacity onPress={() => handlePostComment()}>
              <FontAwesomeIcon
                icon={faPlay}
                size={24}
                color={COLORS.white}
                style={{alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={style.ratingContainer}>
        <Rating
          ratingCount={5}
          type="custom"
          tintColor={COLOR.primaryBackground}
          imageSize={55}
          startingValue={0}
          ratingBackgroundColor={COLOR.secondBackground}
          ratingColor={COLOR.second}
          onFinishRating={setRating}
        />
      </View>
      <TextInput
        value={comment}
        onChangeText={onChangeComment}
        style={style.commentInput}
        placeholder="Tu comentario..."
        placeholderTextColor={'#D1D1D1'}
        multiline={true}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  title: {
    color: COLOR.second,
    fontSize: 18,
    marginLeft: 5,
  },
  headerContainer: {
    flex: 1,
    flexBasis: '65%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
  },
  ratingContainer: {
    borderBottomWidth: 0.4,
    borderBottomColor: COLOR.second,
  },
  commentInput: {
    color: COLOR.second,
    fontSize: 16,
    marginLeft: 4,
  },
});
