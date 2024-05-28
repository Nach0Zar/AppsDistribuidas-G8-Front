import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"


type Props = {
    pictureUrl : string
}

export const ProfileImage = ({pictureUrl} : Props) => {

    return(
            <Image
            source={{uri: pictureUrl}}
            style={styles.image}/>
    )
}


const styles = StyleSheet.create({
    image : {
        borderRadius : 100
    },
    container : {
        
    }



}
)