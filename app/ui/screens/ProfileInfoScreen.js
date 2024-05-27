import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { Button, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { Routes } from "../../navigation/Routes"
import { ProfileInfo } from "../components/molecules/ProfileInfo"
import { CustomButton } from "../components/atoms/CustomButton"



export const ProfileInfoScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View>
                <TouchableHighlight style={styles.topButton}>
                    <View>
                        <Text style={styles.topButton.text}>Omitir por ahora</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={styles.profileContainer}>
                
                    <ProfileInfo />
                
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton title="Guardar" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flexDirection: 'column',
        flex: 1
    },
    buttonContainer: {
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    profileContainer: {
        backgroundColor: 'orange',
        
        height: 'auto'
    },
    topButtonContainer: {
        
    },
    topButton:{
        text: {

        }
    }
})