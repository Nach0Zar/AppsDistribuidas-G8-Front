import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import { ProfileImage } from "../atoms/ProfileImage";
import { COLOR } from "../../styles/Theme";


export const ProfileInfo = () => {
    const [name, setName] = useState('');
    const [surnname, setSurname] = useState('')
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Datos del usuario</Text>
            <Pressable onPress={() => null} style={styles.press}>
            <Image
                style={styles.profileImage}
                source={{
                uri: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}></Image>
            </Pressable>
            <TextInput
                style={styles.textInput}
                onChangeText={setName}
                value={name}
                placeholder="Nombre"
                placeholderTextColor="grey"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={setSurname}
                value={surnname}
                placeholder="Apellido"
                placeholderTextColor="grey"
            />
            <TextInput
                style={styles.textInput}
                value={email}
                editable={false}
                placeholder="Email"
                placeholderTextColor="grey"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={setNickname}
                value={nickname}
                placeholder="Nickname"
                placeholderTextColor="grey"
            />
        </View>

        
    )
}


const styles = StyleSheet.create({
    textInput: {
        fontSize: 15,
        height: 40,
        borderWidth: 1,
        width : '75%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: COLOR.second
    },
    container: {
        alignItems: 'center',
        gap: 15
    },
    title: {
        fontSize: 20,
        fontWeight: 'semibold',
        color: COLOR.second,
    },
    profileImage: {
        height: 150,
        width: 150,
        borderRadius: 100,
    },
    press : {
        borderRadius: 100,
        height: 150,
        width: 150,
        backgroundColor: 'red'
    }

})