import React from "react";
import { Button, StyleSheet, TouchableHighlight, TouchableOpacity, View, Text} from "react-native";
import { COLOR } from "../../../../styles/Theme";


type Props = {
    title: Required<string>,
    onPress: () => void
}





export const CustomButton = ({title, onPress} : Props) => {
    return(
        <TouchableHighlight onPress={onPress}>
            <View style={styles.button}>
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
        padding:10,
        borderRadius: 6.5,
    },
    text:{
        fontWeight: "600",
        fontStyle: 'normal',
        fontSize: 18
    }

})
