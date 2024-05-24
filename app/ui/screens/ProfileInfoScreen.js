import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { Button, Text, View } from "react-native"
import { Routes } from "../../navigation/Routes"


export const ProfileInfoScreen = ({navigation}) => {

    return(
        <View>
            <Text>ProfileInfoScreen</Text>
            <Button title="Guardar" onPress={() => navigation.navigate(Routes.HomeStack)}/>
        </View>
    )
}