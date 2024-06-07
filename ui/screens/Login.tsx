import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, Image, View, Alert } from 'react-native';
import { statusCodes } from '@react-native-google-signin/google-signin';
import GoogleSignIn from '../asset/GoogleSignIn';
import AsyncStorage from '@react-native-async-storage/async-storage'
import loginStyles from '../styles/loginStyles';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState<null | boolean>(null);
  const signIn = async () => {
    try {
      await GoogleSignIn.signIn();
      const newTokens = await GoogleSignIn.getTokens();
      let config = {
        headers: {
          'Authorization': newTokens.accessToken,
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post('https://apps-distribuidas-grupo-8.onrender.com/api/auths', {}, config);
      const tokens = response.data
      config = {
        headers: {
          'Authorization': tokens.jwtToken,
          'Content-Type': 'application/json'
        }
      };
      const authedUserInformationResponse = await axios.get('https://apps-distribuidas-grupo-8.onrender.com/api/users', config);
      const authedUserInformation = authedUserInformationResponse.data
      await AsyncStorage.clear()
      await AsyncStorage.setItem('@firstname', authedUserInformation.firstname || '');//TODO setup in redux
      await AsyncStorage.setItem('@lastname', authedUserInformation.lastname  || '');
      await AsyncStorage.setItem('@email', authedUserInformation.email || '');
      await AsyncStorage.setItem('@image', authedUserInformation.image || '');
      await AsyncStorage.setItem('@refreshToken', tokens.refreshToken || '');
      await AsyncStorage.setItem('@sessionToken', tokens.jwtToken || '');
      // if (response.status === 201) {
      //   setLoggedIn(true);
      //   navigation.navigate('NewUser') TODO: Para mi sacamos este stack
      // } else {
        setLoggedIn(true);
        navigation.dispatch(
          StackActions.replace(Routes.LandingStack)
        );
      // }
    } catch (error:any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login cancelado', 'Cancelaste el proceso de login.');
      } else {
        Alert.alert('Login Error', 'Error inesperado.');
      }
      setLoggedIn(false);
    }
  };
  const checkIfLoggedIn = async () => {
    let googleToken = await AsyncStorage.getItem('@accessToken')
    if (googleToken == '' || googleToken == null){
      setLoggedIn(false)
    }
    else{
      await signIn();  
    }
  }
  useEffect(() => {
    if(loggedIn == null){
      checkIfLoggedIn();
    }
  }, [loggedIn]);

  const navigation = useNavigation();

  
  return (
    <>
    {(loggedIn == false) && 
      <SafeAreaView style={loginStyles.container}>
        <Image
          style={loginStyles.logo}
          source={require('../../assets/images/logo.png')}
        />
        <Text style={loginStyles.message}>Accede para ver el contenido</Text>
        <TouchableOpacity
          onPress={() => signIn()}
          style={loginStyles.googleButton}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../assets/images/google_icon_32.png')} style={loginStyles.buttonImage} />
            <Text style={loginStyles.googleButtonText}>Iniciar sesion</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>}
    </>
  );
};

export default Login;
