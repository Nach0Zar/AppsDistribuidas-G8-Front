import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"


type Props = {
    pictureUrl : string
}

export const ProfileImage = ({pictureUrl} : Props) => {

    return(
        <View style={styles.container}>   
            <Image
            source={{uri: pictureUrl}}
            style={styles.image}/>
        </View>
    )
}


const styles = StyleSheet.create({
    image : {
        borderRadius : 100,
        flex: 1,
        margin: 10
    },
    container : {
        backgroundColor: 'black',
        width: '50%',
        flex: 5
    }



}
)