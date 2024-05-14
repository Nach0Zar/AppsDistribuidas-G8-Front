import React from 'react';
import { Text, SafeAreaView, TouchableOpacity, Image, View } from 'react-native';

import loginStyles from './loginStyles';

const Login = ({ navigation }: { navigation: any }) => {
  /*const loginRealState = () => {
    navigation.navigate('login-real-state');
  };*/

  return (
    <>
      <SafeAreaView style={loginStyles.container}>
        <Image
          style={loginStyles.logo}
          source={require('../../assets/images/logo.png')}
        />
        <Text style={loginStyles.message}>Accede para ver el contenido</Text>
        <TouchableOpacity
          onPress={() => console.log('Ingreso User --')}
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
