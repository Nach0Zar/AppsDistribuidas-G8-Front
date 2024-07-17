import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {UserInfo} from '../atoms/UserInfo';
import {Qualification} from '../atoms/Qualification';
import ConnectionStatus from '../../assets/ConnectionStatus';
import {StackActions, useNavigation} from '@react-navigation/native';
import Routes from '../../../Navigation/Routes';
import {Global} from '../../../Constants';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {logout, setUserToken} from '../../../redux/slices/authSlice';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

interface props {
  userID: String,
  qualification: number
}

interface userInfo {
  username: String;
  userImage: String;
}

export const CommentHeader = ({userID, qualification}: props) => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState<userInfo | null>(null);
  const dispatch = useDispatch();
  const {userToken, refreshToken} = useSelector((state: any) => state.auth);


  useEffect(() => {
    getUserInfo()
  }, []);

  const getUserInfo = async () => {
    try {
      let connectionStatus = await ConnectionStatus();
      if (!connectionStatus) {
        navigation.dispatch(StackActions.replace(Routes.InternetError));
      }
      const response = await axios.get(
        Global.BASE_URL + `/users/${userID}`,
        {
          headers: {
            Authorization: userToken,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        setUserInfo({
            username: response.data.nickname,
            userImage: response.data.image
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        //TODO: Arreglar lo del refreshToken
        /*Esta funcionando mal entonces despues setea el userToken en null con la respuesta de ese endpoint
        y hay problemas*/
        //handleRefreshToken();
        dispatch(logout())
        console.log(error.response.status)
        console.log(error.response)
      } else {
        dispatch(logout());
      }
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

  return (
    <View style={styles.container}>
      <UserInfo username={userInfo?.username} userimage={userInfo?.userImage}></UserInfo>
      <Qualification rating={qualification}></Qualification>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
