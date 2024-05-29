import React from "react";
import { Button, StyleSheet, TouchableHighlight, TouchableOpacity, View, Text} from "react-native";
import { COLOR } from "../../styles/Theme";


type Props = {
    title: Required<string>,
    onPress? : () => void
    backgroundColor? : string,
    color: string
}


export const CustomButton = (props : Props) => {
    return(
        <TouchableHighlight style={[styles.button, {...props}]} onPress={props.onPress}>
            <Text style={[styles.text,{...props}]}>{props.title}</Text>
        </TouchableHighlight>
    )
}



const styles = StyleSheet.create({
    button:{
        backgroundColor: COLOR.primary,
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
        color: COLOR.black
    }

})
