import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS, {COLOR} from '../../styles/Theme';
import {CustomButton} from '../atoms/CustomButton';
import {Global} from '../../../Constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {logout, setUserImage, setUserInfo, setUserToken} from '../../../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { ErrorMessage } from '../atoms/ErrorMessage';
import ConnectionStatus from '../../assets/ConnectionStatus';
import Routes from '../../../Navigation/Routes';

export const ProfileInfo = () => {
  const [firstNameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [photo, setPhoto] = useState({
    name: '',
    type: '',
    uri: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    nickname: '',
    email: '',
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userInfo, userToken, refreshToken} = useSelector(state => state.auth);

  useEffect(() => {
    setPhoto({...photo, uri: userInfo.image});
    setUserData(userInfo);
  }, []);

  const handleChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };


  const validateForm = () => {
    let formIsValid /*: boolean*/ = true;
  
    if (userData.firstname == '') {
      setFirstnameError(true)
      console.log('Firstname:' + userData.firstname);
      formIsValid = false;
    }
    else{
      setFirstnameError(false)
    }
    //TODO: Validar que el nombre sean solo letras

    if (userData.lastname == '') {
      setLastnameError(true)
      console.log('Lastname:' + userData.lastname);
      formIsValid = false;
    }else{
      setLastnameError(false)
    }
    //TODO: Validar que el apellido sean solo letras

    if (userData.nickname == '') {
      setNicknameError(true)
      formIsValid = false;
      console.log('Nickname: ' + userData.nickname);
    }
    else{
      setNicknameError(false)
    }

    return formIsValid;
  };

  const handleRefreshToken = async () => {
    try{
      const refreshTokenResponse = await axios.put(
        Global.BASE_URL + '/auths',{
        headers: {
          "Authorization" : refreshToken,
          "Content-Type" : "application/json"
        }}
      );
      if(refreshTokenResponse.status === 200){
        console.log(JSON.stringify(refreshTokenResponse));
        dispatch(setUserToken(refreshTokenResponse))
      }
    }catch(error){
      console.log('Sucedio un error al refrescar: ' + error.message);
      dispatch(logout());
    }
  };


  //Crea el body necesario para enviar el file
  const createFormData = photo => {
    const data = new FormData();
    data.append('file', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });
    return data;
  };

  const onSubmitFormHandler = async event => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        let connectionStatus = await ConnectionStatus()
        if(!connectionStatus){
          navigation.dispatch(StackActions.replace(Routes.InternetError));
        }
        //Actualizar datos del usuario
        const updateUserResponse = await axios.post(
          Global.BASE_URL + '/users',
          userData,
          {
            headers: {
              Authorization: userToken,
              'Content-Type': 'application/json',
            },
          },
        );

        if (updateUserResponse.status === 200) {
          dispatch(setUserInfo(userData));
        } else {
          throw new Error(
            'Ocurrio un error al actualizar los datos de usuario' +
              updateUserResponse.data,
          );
        }

        //Actualizar la imagen
        if (photo.uri != userInfo.image) {
          configImage = {
            headers: {
              Authorization: userToken,
              'Content-Type': 'multipart/form-data',
            },
          };
          
          connectionStatus = await ConnectionStatus()
          if(!connectionStatus){
            navigation.dispatch(StackActions.replace(Routes.InternetError));
          }
          const changePhotoResponse = await axios.put(
            Global.BASE_URL + '/users/images',
            createFormData(photo),
            configImage,
          );

          if (changePhotoResponse.status === 200) {
            dispatch(setUserImage(changePhotoResponse.data));
          } else {
            throw new Error(
              'Ocurrio un error al actualizar imagen' +
                changePhotoResponse.status,
            );
          }
        }

        navigation.goBack();

      } catch (error) {
        if (error.response && error.response.status === 403) {
          //TODO: Arreglar el refresh y refactor
          console.log('403')
          handleRefreshToken();
        } else {
          Alert.alert(
            'Ocurrio un error',
            `Mensaje: ${error.message} \nCodigo de error:  ${error.code}`,
          );
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

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
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => openImagePicker()} style={styles.press}>
        {photo.uri ? (
          <Image
            style={styles.profileImage}
            source={{
              uri: photo.uri,
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
        onChangeText={value => handleChange('firstname', value)}
        value={userData.firstname}
        placeholder="Nombre"
        placeholderTextColor="grey"
      />
      {firstNameError && 
        <ErrorMessage message = "Por favor ingrese un nombre"></ErrorMessage>
      }
      <TextInput
        style={styles.textInput}
        onChangeText={value => handleChange('lastname', value)}
        value={userData.lastname}
        placeholder="Apellido"
        placeholderTextColor="grey"
      />
      {lastnameError && 
        <ErrorMessage message = "Por favor ingrese un apellido"></ErrorMessage>
      }
      <TextInput
        style={styles.textInput}
        value={userData.email}
        editable={false}
        placeholder="Email"
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={value => handleChange('nickname', value)}
        value={userData.nickname}
        placeholder="Nickname"
        placeholderTextColor="grey"
      />
      {nicknameError == true && 
        <ErrorMessage message = "Por favor ingrese un nickname"></ErrorMessage>
      }
      <View style={{marginTop: 160, marginBottom: 10, alignItems: 'center'}}>
        {!isLoading ? 
        <CustomButton
          title="Guardar"
          color={COLOR.black}
          onPress={() => onSubmitFormHandler()}></CustomButton>
          : <ActivityIndicator size="large" color={COLORS.primary} />}
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
    alignItems : 'flex-start'
  },
});
