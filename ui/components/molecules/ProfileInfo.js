import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProfileImage} from '../atoms/ProfileImage';
import {COLOR} from '../../styles/Theme';
import {CustomButton} from '../atoms/CustomButton';
import {getUserData} from '../../../utils/UserData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Global} from '../../../Constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';

/*
interface IUserData {
    firstname : string,
    lastname : string,
    nickname : string,
    email : string,
    image : string
}

interface IErrors {
    firstnameError : string,
    lastnameError : string,
    nicknameError : string
}
*/


export const ProfileInfo = () => {
  const [errors, setErrors] = useState({
    firstnameError: '',
    lastnameError: '',
    nicknameError: '',
  });
  const [photo, setPhoto] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  

  const handleChange = (field, value) => {
    setUserData({
        ...userData,
        [field] : value
    });
  }

  const handleSubmit = () => {
    console.log("Form submitted");
    //TODO: Send data to backend
  }



  const validateForm = () => {
    let formIsValid /*: boolean*/ = true;

    if (userData.firstname == '') {
      setErrors({
        ...errors,
        firstnameError: 'Por favor ingrese un nombre',
      });
      console.log('Firstname:' + userData.firstname);
      formIsValid = false;
    }
    //TODO: Validar que el nombre sean solo letras

    if (userData.lastname == '') {
      setErrors({
        ...errors,
        lastnameError: 'Por favor ingrese un apellido',
      });
      console.log('Lastname:' + userData.lastname);
      formIsValid = false;
    }
    //TODO: Validar que el apellido sean solo letras

    if (userData.nickname == '') {
      setErrors({
        ...errors,
        nicknameError: 'Por favor ingrese un nickname',
      });
      formIsValid = false;
      console.log('Nickname: ' + userData.nickname);
    }

    return formIsValid;
  };


  //Crea el body necesario para enviar el file
  const createFormData = (photo) => {
    const data = new FormData();
    data.append('file', {
        name: photo.fileName,
        type : photo.type,
        uri : Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '')
    })
    return data;
  }

  

  const onSubmitFormHandler = async (event) => {
    setIsLoading(true);
    const jwt = await AsyncStorage.getItem(Global.JWT_TOKEN);
    config = {
        
    };
    try{
        //Actualizar los datos del usuario
        console.log("Ejecutando PUT en /users")

        //Actualizar datos del usuario
        const updateUserResponse = await axios.post(Global.BASE_URL + '/users', userData, {headers: {
            'Authorization': jwt,
            'Content-Type': 'application/json'
        }});

        if(updateUserResponse.status === 200){
            console.log(JSON.stringify(updateUserResponse.data))
            await AsyncStorage.setItem(Global.FIRSTNAME, userData.firstname);
            await AsyncStorage.setItem(Global.LASTNAME, userData.lastname);
            await AsyncStorage.setItem(Global.NICKNAME, userData.nickname);

        }
        else{
            throw new Error("Ocurrio un error al actualizar los datos de usuario" + updateUserResponse.data);
        }
        
        //Actualizar la imagen
        if(photo){
            console.log("Ejecutando PUT en /users/images")            
            configImage = {
                headers: {
                  'Authorization': jwt,
                  'Content-Type': 'multipart/form-data'
                }
            };
            const changePhotoResponse = await axios.put(Global.BASE_URL + '/users/images', createFormData(photo), configImage);

            if(changePhotoResponse.status === 200){
                console.log(JSON.stringify(changePhotoResponse.data));
                AsyncStorage.setItem(Global.IMAGE, changePhotoResponse.data)
            }
            else{
                throw new Error("Ocurrio un error al actualizar imagen" + changePhotoResponse.status)
            }
        }
    }
    catch(error){
        Alert.alert("Ocurrio un error");
        console.log('Error: ' + error.message);
    }
    finally{
        setIsLoading(false);
    }
  }

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setPhoto(response.assets?.[0]);
        setUserData({
            ...userData,
            image : imageUri
        })
      }
    });
  };

 


  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => openImagePicker()} style={styles.press}>
        {userInfo.image ? (
          <Image
            style={styles.profileImage}
            source={{
              uri: userInfo.image,
            }}></Image>
        ) : (
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            }}></Image>
        )}
      </Pressable>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => handleChange("firstname", value)}
        value={userInfo.firstname}
        placeholder="Nombre"
        placeholderTextColor="grey"
      />
      {errors.firstnameError != '' ? (
        <Text style={styles.errors}>{errors.firstnameError}</Text>
      ) : null}
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => handleChange("lastname", value)}
        value={userInfo.lastname}
        placeholder="Apellido"
        placeholderTextColor="grey"
      />
      {errors.firstnameError != '' ? (
        <Text style={styles.errors}>{errors.lastnameError}</Text>
      ) : null}
      <TextInput
        style={styles.textInput}
        value={userInfo.email}
        editable={false}
        placeholder="Email"
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => handleChange("nickname", value)}
        value={userInfo.nickname}
        placeholder="Nickname"
        placeholderTextColor="grey"
      />
      {errors.nicknameError != '' ? (
        <Text style={styles.errors}>{errors.nicknameError}</Text>
      ) : null}
      <View style={{marginTop: 160, marginBottom: 10, alignItems: 'center'}}>
        <CustomButton
          title="Guardar"
          color={COLOR.black}
          onPress={onSubmitFormHandler}></CustomButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 15,
    height: 40,
    borderWidth: 1,
    width: '75%',
    borderRadius: 4,
    padding: 10,
    backgroundColor: COLOR.second,
  },
  container: {
    alignItems: 'center',
    gap: 15,
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
  press: {
    borderRadius: 100,
    height: 150,
    width: 150,
    backgroundColor: 'red',
    marginBottom: 40,
  },
  errors: {
    color: 'red',
  },
});
