import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LoginScreen } from "../ui/screens/LoginScreen.js";
import { EditProfileScreen } from "../ui/screens/EditProfileScreen.js";
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
        <Stack.Navigator initialRouteName={Routes.ProfileInfo}>
                <Stack.Screen name={Routes.Login} component={LoginScreen} options={options}/>
                <Stack.Screen name={Routes.ProfileInfo} component={EditProfileScreen} options={options}/>
                <Stack.Screen name={Routes.Home} component={HomeScreen} options={options}/>
        </Stack.Navigator>
    );
}

const options = {
    headerShown: false
}