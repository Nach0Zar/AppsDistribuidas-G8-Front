import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import RootNavigator from './Navigation/RootNavigator';

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return (
    <RootNavigator/>
  );
}
export default App;