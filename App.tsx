import React, {useEffect} from 'react';
import { Text } from "react-native"
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './components/login/Login';
import NewUser from  './components/newUser/NewUser';
import Home from  './components/Home/Home';

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
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
}

export default App;