import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Button, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import COLORS from "../styles/Theme";
import { Routes } from "../../Navigation/Routes";
import { CustomButton } from "../components/atoms/CustomButton";




export const HomeScreen = ({navigation}) => {

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    return(
        <View>
            <CustomButton title="Login" onPress={navigation.push(Routes.EditProfile)}/>
        </View>
    )
}