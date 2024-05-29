import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import { Text } from "react-native"
import SplashScreen from 'react-native-splash-screen';
import { LoginScreen } from './app/ui/screens/LoginScreen.js';
import { LoginNavigation, ProfileNavigation } from './app/navigation/Navigation';


const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  

  return(
    <NavigationContainer>
      {/*<LoginNavigation/>*/}
      <ProfileNavigation/>
    </NavigationContainer>
  )
}

export default App;