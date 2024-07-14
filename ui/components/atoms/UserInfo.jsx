import { Image, StyleSheet, Text, View } from "react-native"
import React from "react"



export const UserInfo = ({username}) => {
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: 'https://s.hs-data.com/bilder/spieler/gross/142105.jpg'}}></Image>
            <Text style={styles.text}>@{username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginRight: 8
    },
    text: {
        fontSize: 14
    }
})