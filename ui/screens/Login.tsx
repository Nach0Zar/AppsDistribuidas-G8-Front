import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, Image, View, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage'
import loginStyles from '../styles/loginStyles';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
}


const Login = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    
  }, []);

  const navigation = useNavigation();

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
      await AsyncStorage.clear()
      await AsyncStorage.setItem('@firstname', userInfo.user.name || '');
      await AsyncStorage.setItem('@lastname', userInfo.user.givenName || '');
      await AsyncStorage.setItem('@email', userInfo.user.email || '');
      await AsyncStorage.setItem('@image', userInfo.user.photo || '');
      await AsyncStorage.setItem('@googleToken', userInfo.idToken || '');
      await AsyncStorage.setItem('@sessionToken', jwtToken || '');
      if (response.status === 201) {
        //navigation.navigate('NewUser') TODO: Para mi sacamos este stack
      } else {
        navigation.dispatch(
          StackActions.replace(Routes.LandingStack)
        );
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
