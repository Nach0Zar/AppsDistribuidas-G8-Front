import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { COLOR } from "../styles/Theme";
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationOptions, NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "../../Navigation/Routes";
import { RootStackParamList } from "../../Navigation/Navigation";
import { CustomButton } from "../components/atoms/CustomButton";


export const LoginScreen = ({navigation}) => {

    return(
        <View style={Styles.container}>
            <CustomButton title="Login" onPress={() => navigation.navigate(Routes.ProfileInfoStack) }/>
        </View>
    )
}



const Styles = StyleSheet.create({
    container: {
        
    }


}
)