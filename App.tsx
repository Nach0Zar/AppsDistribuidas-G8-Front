import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';



import Login from './ui/screens/Login';
import Home from  './ui/screens/Home';
import NewUser from './ui/screens/NewUser';
import RootNavigator from './Navigation/RootNavigator';

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return (
    <RootNavigator/>
  );
  {/*<NavigationContainer>
      {/*<LoginNavigation/>
      <ProfileNavigation/>
    </NavigationContainer>
  */}
}
export default App;