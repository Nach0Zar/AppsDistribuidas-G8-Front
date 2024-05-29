import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import { Text } from "react-native"
import SplashScreen from 'react-native-splash-screen';



import Login from './ui/screens/Login';
import NewUser from  './ui/screens/NewUser';
import Home from  './ui/screens/Home';

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
  {/*<NavigationContainer>
      {/*<LoginNavigation/>
      <ProfileNavigation/>
    </NavigationContainer>
  */}
}

export default App;