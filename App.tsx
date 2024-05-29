import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import { Text } from "react-native"
import SplashScreen from 'react-native-splash-screen';
<<<<<<< HEAD
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './ui/screens/Login';
import NewUser from  './ui/screens/NewUser';
import Home from  './ui/screens/Home';
=======
import { LoginScreen } from './app/ui/screens/LoginScreen.js';
import { LoginNavigation, ProfileNavigation } from './app/navigation/Navigation';

>>>>>>> feature/profile-screen

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
<<<<<<< HEAD
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: '',
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="NewUser"
            component={NewUser}
          />
          <Stack.Screen
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
=======

  return(
    <NavigationContainer>
      {/*<LoginNavigation/>*/}
      <ProfileNavigation/>
    </NavigationContainer>
  )
>>>>>>> feature/profile-screen
}

export default App;