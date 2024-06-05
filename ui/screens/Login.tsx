import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, Image, View, Alert, ActivityIndicator } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage'
import loginStyles from '../styles/loginStyles';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';
import { Global } from '../../Constants';

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
}


const Login = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    isLoggedIn();
  }, []);

  const isLoggedIn = async () => {
    setIsLoading(true)
    try{
      const jwt = await AsyncStorage.getItem('@sessionToken');
      if(jwt != null){
        console.log('Hay un jwt almacenado: ' + jwt)
        navigation.dispatch(StackActions.replace(Routes.LandingStack));
      }
    }
    catch(error){
      Alert.alert('Login Error', 'Error inesperado.');
    }
    finally{
      setIsLoading(false)
    }
  }

  
  const signIn = async () => {
    setIsLoading(true)
    try {
      const googleResponse = await GoogleLogin();
      const {idToken} = googleResponse;
      console.log(idToken)
      console.log('Inicio llamado POST backend')
      const backendResponse = await axios.post('https://apps-distribuidas-grupo-8.onrender.com/api/auths', {}, {
        headers: {
          'Authorization' : idToken,
          'Content-Type' : 'application/json'
        }
      });
      const jwtToken = backendResponse.data
      console.log(JSON.stringify(backendResponse.data))
      //TODO: Aca deberia guardarse el jwt y el refresh token que actualmente solo se devuelve el jwt
      console.log('Inicio llamado GET backend')
      const authedUserInformationResponse = await axios.get('https://apps-distribuidas-grupo-8.onrender.com/api/users',{
        headers : {
          'Authorization': jwtToken,
          'Content-Type': 'application/json'
        }
      });
      const authedUserInformation = authedUserInformationResponse.data
      console.log('Cargado de datos en local storage')
      await AsyncStorage.clear()
      await AsyncStorage.setItem(Global.FIRSTNAME, authedUserInformation.firstname || '');
      await AsyncStorage.setItem(Global.LASTNAME, authedUserInformation.lastname  || '');
      await AsyncStorage.setItem(Global.EMAIL, authedUserInformation.email || '');
      await AsyncStorage.setItem(Global.IMAGE, authedUserInformation.image || '');
      await AsyncStorage.setItem('@googleToken', idToken || '');
      await AsyncStorage.setItem(Global.JWT_TOKEN, jwtToken || '');
      if (backendResponse.status === 201) {
        console.log('Status 201')
        //navigation.navigate('NewUser') TODO: Para mi sacamos este stack
      } else {
        setIsLoading(false)
        navigation.dispatch(
          StackActions.replace(Routes.LandingStack)
        );
      }
    } catch (error : any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login cancelado', 'Cancelaste el proceso de login.');
      } else {
        Alert.alert('Login Error', 'Error inesperado.');
      }
    }
    finally{
      setIsLoading(false)
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
        {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : <TouchableOpacity
          onPress={() => signIn()}
          style={loginStyles.googleButton}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../assets/images/google_icon_32.png')} style={loginStyles.buttonImage} />
            <Text style={loginStyles.googleButtonText}>Iniciar sesion</Text>
          </View>
        </TouchableOpacity>
      }
        
      </SafeAreaView>
    </>
  );
};

export default Login;
