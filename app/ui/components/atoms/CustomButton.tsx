import React from "react";
import { Button, StyleSheet, TouchableHighlight, TouchableOpacity, View, Text} from "react-native";
import { COLOR } from "../../styles/Theme";


type Props = {
    title: Required<string>,
    onPress: () => void
}


export const CustomButton = ({title, onPress} : Props) => {
    return(
        <TouchableHighlight style={styles.button} onPress={onPress}>
            <View>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    button:{
        backgroundColor: COLOR.primary,
        color: COLOR.secondBackground,
        alignItems : 'center',
        justifyContent: 'center',
        padding:10,
        borderRadius: 6.5,
        width: 260,
        height: 53
    },
    text:{
        fontWeight: "600",
        fontStyle: 'normal',
        fontSize: 18,
        color: COLOR.secondBackground
    }

})
