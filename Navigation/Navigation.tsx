import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LoginScreen } from "../ui/screens/LoginScreen.js";
import { EditProfileScreen } from "../ui/screens/EditProfileScreen.js";
import { HomeScreen } from "../ui/screens/HomeScreen.js";
import { Routes } from "./Routes.js";
import { ProfileInfoScreen } from "../ui/screens/ProfileInfoScreen.js";

const Stack = createNativeStackNavigator();


export const LoginNavigation = () => {
    return(
        <Stack.Navigator initialRouteName={Routes.EditProfile}>
                <Stack.Screen name={Routes.ProfileInfo} component={ProfileInfoScreen} options={options}/>
        </Stack.Navigator>
    );
}


export const ProfileNavigation = () => {
    return(
        <Stack.Navigator initialRouteName={Routes.ProfileInfo}>
                <Stack.Screen name={Routes.ProfileInfo} component={ProfileInfoScreen} options={options}/>
                <Stack.Screen name={Routes.EditProfile} component={EditProfileScreen} options={options}/>
                <Stack.Screen name={Routes.Home} component={HomeScreen} options={options}/>
        </Stack.Navigator>
    )
}




const options = {
    headerShown: false
}