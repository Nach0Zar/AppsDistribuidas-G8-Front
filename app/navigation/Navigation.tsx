import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LoginScreen } from "../ui/screens/LoginScreen.js";
import { ProfileInfoScreen } from "../ui/screens/ProfileInfoScreen";
import { HomeScreen } from "../ui/screens/HomeScreen";
import { Routes } from "./Routes";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
    Home: undefined
    Login: undefined
    ProfileInfo : undefined
};


export const LoginNavigation = () => {
    return(
        <Stack.Navigator initialRouteName={Routes.LoginStack}>
                <Stack.Screen name={Routes.LoginStack} component={LoginScreen}/>
                <Stack.Screen name={Routes.ProfileInfoStack} component={ProfileInfoScreen}/>
                <Stack.Screen name={Routes.HomeStack} component={HomeScreen}/>
        </Stack.Navigator>
    );
}