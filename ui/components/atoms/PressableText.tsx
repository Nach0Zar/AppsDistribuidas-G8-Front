import { Pressable, StyleSheet, Text } from "react-native"
import React from "react"
import { COLOR } from "../../styles/Theme"


type Props = {
    text: string,
    onPress: () => void
}


export const PressableText = (props : Props) => {
    return(
        <Pressable onPress={props.onPress}>
          <Text style={styles.pressableText}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressableText: {
        fontSize: 18,
        color: COLOR.second,
        fontWeight: 'medium',
        fontFamily: 'roboto',
      }
})