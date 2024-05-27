import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, Image, View, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage'
import loginStyles from '../styles/loginStyles';
import axios from 'axios';

const Login = ({ navigation }: { navigation: any }) => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1058795952414-kt6i0psmqpvc2rdbedbpe4ijk81hls1h.apps.googleusercontent.com',
      offlineAccess: true
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const config = {
        headers: {
        'Authorization': userInfo.idToken,
        'Content-Type': 'application/json'}
      };
      const response = await axios.post('https://apps-distribuidas-grupo-8.onrender.com/api/auths', {}, config);
      const jwtToken = response.data
      /*
      TODO: Pass JWT logic, Put? Delete?
      */
      await AsyncStorage.clear()
      await AsyncStorage.setItem('@firstname', userInfo.user.name || '');
      await AsyncStorage.setItem('@lastname', userInfo.user.givenName || '');
      await AsyncStorage.setItem('@email', userInfo.user.email || '');
      await AsyncStorage.setItem('@image', userInfo.user.photo || '');
      await AsyncStorage.setItem('@googleToken', userInfo.idToken || '');
      await AsyncStorage.setItem('@sessionToken', jwtToken || '');
      if (response.status === 201) {
        navigation.navigate('NewUser');
      } else {
        navigation.navigate('Home');
      }
    } catch (error:any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login cancelado', 'Cancelaste el proceso de login.');
      } else {
        Alert.alert('Login Error', 'Error inesperado.');
      }
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
        <TouchableOpacity
          onPress={() => signIn()}
          style={loginStyles.googleButton}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../assets/images/google_icon_32.png')} style={loginStyles.buttonImage} />
            <Text style={loginStyles.googleButtonText}>Iniciar sesion</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default Login;
