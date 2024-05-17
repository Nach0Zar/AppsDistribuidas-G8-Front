import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, Image, View, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { User } from '@react-native-google-signin/google-signin/src/types';
import loginStyles from './loginStyles';
import axios from 'axios';

interface UserInfo {
  name: string;
  email: string;
  photo: string;
}

const Login = ({ navigation }: { navigation: any }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '371785366082-fnuudgb8h47kfv9nmjaag14van5fk0s4.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo({
        name: userInfo.user.name || '',
        email: userInfo.user.email  || '',
        photo: userInfo.user.photo || '',
      });

      const header = {
        'Authorization': userInfo.idToken,
        'Content-Type': 'application/json',
      };

      const response = await axios.post('/auths', { header });
      const jwtToken = response.data

      
      if (response.status === 201) { //hardcode this to test
        //201 = new user - register user
        navigation.navigate('NewUser');
      } else { //200 = login user
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
