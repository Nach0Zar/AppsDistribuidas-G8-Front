import { StyleSheet, Text, View } from "react-native"
import React from "react"
import COLORS, { COLOR } from "../../styles/Theme"

type Props = {
    message: Required<string>
}


export const ErrorMessage = ( props : Props) => {

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.message}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
    },
    text : {
        color: COLOR.warning,
    }
    
})