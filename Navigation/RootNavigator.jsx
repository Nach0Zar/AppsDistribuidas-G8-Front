import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../ui/screens/Login";
import LandingStack from './LandingStack';
import HomeStack from './HomeStack';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={ {headerShown: false} }>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="LandingStack"
          component={LandingStack}
        />
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
    )
}
export default RootNavigator;
