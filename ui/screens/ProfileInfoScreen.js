import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLOR} from '../styles/Theme';
import {CustomButton} from '../components/atoms/CustomButton';
import {useEffect, useState} from 'react';
import {CustomModal} from '../components/organisms/CustomModal';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { refreshToken } from '../../utils/RefreshToken';
import { Global } from '../../Constants';
import { getUserData } from '../../utils/UserData';
import GoogleSignIn from '../asset/GoogleSignIn';
import { useSelector } from 'react-redux';


export const ProfileInfoScreen = () => {
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [modalDeleteAccVisible, setModalDeleteAccVisible] = useState(false);
  
  const { userInfo } = useSelector((state) => state.user);

  const navigation = useNavigation();

  const handleGoogleLogout = async () => {
    try{
      const jwt = await AsyncStorage.getItem(Global.JWT_TOKEN);
      console.log(jwt)
      const logOutResponse = await axios.delete(Global.BASE_URL + "/auths", {
        headers: {
          "Authorization" : jwt,
          "Content-Type" : "application/json"
        }
      });
      if(logOutResponse.status === 200){
        console.log(logOutResponse.data);
        GoogleSignIn.signOut();
        await AsyncStorage.clear();
        navigation.dispatch(StackActions.replace(Routes.LoginScreen));
      }
      else{
        throw new Error("Ocurrio un error al desloguear usuario: " + logOutResponse.data);
      }
    }
    catch(error){
      Alert.alert("Error", "Ocurrio un error al cerrar la sesión " + error.message)
    }
  }

  const deleteAccount = async () => {
    try{
      const jwtToken = await AsyncStorage.getItem(Global.JWT_TOKEN);
      const response = await axios.delete(Global.BASE_URL + '/auths',{
        headers: {
          'Authorization' : jwtToken,
          'Content-Type' : 'application/json'
        }
      })
      return response
    }
    catch(error) {
      console.log("Ocurrio un error en DELETE /auth " + error)
    }
  }


  const handleDeleteAccount = async () => {

  }

  /*
  const getUserData = async () => {
    const firstname = await AsyncStorage.getItem(Global.FIRSTNAME);
    const lastname = await AsyncStorage.getItem(Global.LASTNAME);
    const email = await AsyncStorage.getItem(Global.EMAIL);
    const nickname = await AsyncStorage.getItem(Global.NICKNAME);
    const image = await AsyncStorage.getItem(Global.IMAGE);
    setUserData({
      firstname: firstname,
      lastname : lastname,
      email: email,
      nickname: nickname,
      image: image
    })
  }

  useEffect(() =>{  
    getUserData();
  }, [])
  */
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{
          uri: userInfo?.image ? userInfo?.image : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw154XIaURLCbUhyBzfeh8aj&ust=1717295665249000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIjf3YGvuYYDFQAAAAAdAAAAABAE'
        }}></Image>

      <View style={styles.buttonContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{userInfo?.firstname} {userInfo?.lastname}</Text>
          <Text style={styles.text}>{userInfo?.email}</Text>
          <Text style={styles.text}>{userInfo?.nickname}</Text>
        </View>
        <CustomButton
          title="Editar"
          onPress={() => navigation.navigate(Routes.EditProfile)}
        />
        <CustomButton
          title="Cerrar Sesión"
          onPress={() => setModalLogoutVisible(true)}
        />
        <CustomButton
          title="Eliminar Cuenta"
          backgroundColor={COLOR.warning}
          onPress={() => setModalDeleteAccVisible(true)}
        />
      </View>
      <CustomModal
        isVisible={modalLogoutVisible}
        text="¿Estas seguro que queres cerrar la sesión?"
        actionButton={{
          title: 'Si, cerrar',
          onPress: () => handleGoogleLogout(),
        }}
        closeButton={{
          title: 'Cancelar',
          close: () => setModalLogoutVisible(false),
        }}
      />
      <CustomModal
        isVisible={modalDeleteAccVisible}
        text="¿Estas seguro que queres eliminar tu cuenta?"
        actionButton={{
          title: 'Si, eliminar',
          onPress: () => navigation.dispatch(StackActions.replace(Routes.LoginScreen)), //TODO: eliminar la cuenta
        }}
        closeButton={{
          title: 'Cancelar',
          close: () => setModalDeleteAccVisible(false),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primaryBackground,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center'
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: '25%',
  },
  textContainer: {
    gap: 5,
    marginTop: 42,
    marginBottom: 60,
  
  },
  text: {
    fontFamily: '',
    color: COLOR.second,
    fontSize: 18,
    fontWeight: 'medium'
  },
  buttonContainer: {
    gap: 10,
    alignItems: 'center',
    maxWidth: '70%'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
