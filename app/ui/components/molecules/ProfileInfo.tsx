import { Image, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import { ProfileImage } from "../atoms/ProfileImage";


export const ProfileInfo = () => {
    const [name, setName] = useState('');
    const [surnname, setSurname] = useState('')



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Datos del usuario</Text>
            <ProfileImage pictureUrl="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"/>
            <TextInput
                style={styles.textInput}
                onChangeText={setName}
                value={name}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={setSurname}
                value={surnname}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={setSurname}
                value={surnname}
                editable={false}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={setSurname}
                value={surnname}
            />
        </View>
    )


}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        padding:10,
        margin:5,
        width : '70%',
        flex: 1
    },
    container: {
        backgroundColor : 'yellow',
        alignItems: 'center',
        height : '80%',
        marginTop: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    }


})