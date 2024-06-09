import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {statusCodes} from '@react-native-google-signin/google-signin';
import GoogleSignIn from '../asset/GoogleSignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginStyles from '../styles/loginStyles';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import Routes from '../../Navigation/Routes';
import {Global} from '../../Constants';
import {useDispatch, useSelector} from 'react-redux';
import { userLogin } from '../../redux/slices/authActions';


const Login = () => {
  const {loading, userToken, error} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  
  useEffect(() => {
    if (userToken != null){
      navigation.dispatch(StackActions.replace(Routes.LandingStack));
    }
  }, [userToken])
  

  const onHandleSignIn = () => {
    dispatch(userLogin());
  };

  const signIn = async () => {
    try {
      

      console.log('Google token: ' + newTokens.accessToken);
      const tokens = response.data;
      config = {
        headers: {
          Authorization: tokens.jwt,
          'Content-Type': 'application/json',
        },
      };

      console.log('Jwt token: ' + tokens.jwt);

      const authedUserInformationResponse = await axios.get(
        'https://apps-distribuidas-grupo-8.onrender.com/api/users',
        config,
      );
      const authedUserInformation = authedUserInformationResponse.data;
      await AsyncStorage.clear();
      await AsyncStorage.setItem(
        Global.FIRSTNAME,
        authedUserInformation.firstname || '',
      ); //TODO setup in redux
      await AsyncStorage.setItem(
        Global.LASTNAME,
        authedUserInformation.lastname || '',
      );
      await AsyncStorage.setItem(
        Global.EMAIL,
        authedUserInformation.email || '',
      );
      await AsyncStorage.setItem(
        Global.IMAGE,
        authedUserInformation.image || '',
      );
      await AsyncStorage.setItem(
        Global.REFRESH_TOKEN,
        tokens.refreshToken || '',
      );
      await AsyncStorage.setItem(
        Global.NICKNAME,
        authedUserInformation.nickname || '',
      );
      await AsyncStorage.setItem(Global.JWT_TOKEN, tokens.jwt || '');
      // if (response.status === 201) {
      //   setLoggedIn(true);
      //   navigation.navigate('NewUser') TODO: Para mi sacamos este stack
      // } else {
      setLoggedIn(true);
      navigation.dispatch(StackActions.replace(Routes.LandingStack));
      // }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login cancelado', 'Cancelaste el proceso de login.');
      } else {
        Alert.alert('Login Error', 'Error inesperado.');
      }
      setLoggedIn(false);
    }
  };
  

  

  return (
    <>
        <SafeAreaView style={loginStyles.container}>
          <Image
            style={loginStyles.logo}
            source={require('../../assets/images/logo.png')}
          />
          <Text style={loginStyles.message}>Accede para ver el contenido</Text>
          {!loading ? 
            <TouchableOpacity
              onPress={() => onHandleSignIn()}
              style={loginStyles.googleButton}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../assets/images/google_icon_32.png')}
                  style={loginStyles.buttonImage}
                />
                <Text style={loginStyles.googleButtonText}>Iniciar sesion</Text>
              </View>
            </TouchableOpacity>
          :<ActivityIndicator size="large" />}
        </SafeAreaView>
      
    </>
  );
};

export default Login;
