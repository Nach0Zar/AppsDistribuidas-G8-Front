import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../ui/screens/Login";
import LandingStack from './LandingStack';
import HomeStack from './HomeStack';
import Routes from "./Routes";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.LoginScreen}
        screenOptions={ {headerShown: false} }>
        <Stack.Screen
          name={Routes.LoginScreen}
          component={Login}
        />
        <Stack.Screen
          name={Routes.LandingStack}
          component={LandingStack}
        />
        <Stack.Screen
          name={Routes.HomeStack}
          component={HomeStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
    )
}
export default RootNavigator;
