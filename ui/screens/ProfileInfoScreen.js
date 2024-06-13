import {
  Alert,
  Image,
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
import axios from 'axios';
import { Global } from '../../Constants';
import GoogleSignIn from '../assets/GoogleSignIn';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserToken } from '../../redux/slices/authSlice';
import ConnectionStatus from '../assets/ConnectionStatus';
import InternalError from './errors/InternalError';

export const ProfileInfoScreen = () => {
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalDeleteAccVisible, setModalDeleteAccVisible] = useState(false);
  const dispatch = useDispatch();
  const { userInfo, userToken, refreshToken  } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  useEffect( () => {
    if(userToken == null){
      navigation.dispatch(StackActions.replace(Routes.LoginScreen));
    }
  }, [userToken, error])
  const loadProfileInfo = async () => {
    navigation.dispatch(StackActions.replace(Routes.ProfileInfo))
  }
  const handleGoogleLogout = async () => {
    try{
      let connectionStatus = await ConnectionStatus()
      if(!connectionStatus){
        navigation.dispatch(StackActions.replace(Routes.InternetError));
      }
      const response = await axios.delete(Global.BASE_URL + "/auths", {
        headers: {
          "Authorization" : userToken,
          "Content-Type" : "application/json"
        }
      });
      if(response.status === 200){
        await GoogleSignin.signOut();
        dispatch(logout());
      }
      else{
        throw new Error("Ocurrio un error al desloguear usuario: " + response.data);
      }
    }
    catch(error){
      if(error.response && error.response.status === 403){
        await GoogleSignIn.signOut();
        dispatch(logout());
      }
      else{
        setError(true)
        setErrorMessage(`Mensaje: ${error.message} \nCodigo de error:  ${error.code}`)
      }
    }
  }

  const handleRefreshToken = async () => {
    try{
      let connectionStatus = await ConnectionStatus()
      if(!connectionStatus){
        navigation.dispatch(StackActions.replace(Routes.InternetError));
      }
      const refreshTokenResponse = await axios.put(
        Global.BASE_URL + '/auths',{
        headers: {
          "Authorization" : refreshToken,
          "Content-Type" : "application/json"
        }}
      );
      if(refreshTokenResponse.status === 200){
        dispatch(setUserToken(refreshTokenResponse))
      }
    }catch(error){
      dispatch(logout());
    }
  };

  const handleDeleteAccount = async () => {
    try{
      let connectionStatus = await ConnectionStatus()
      if(!connectionStatus){
        navigation.dispatch(StackActions.replace(Routes.InternetError));
      }
      const response = await axios.delete(Global.BASE_URL + '/users',{
        headers: {
          'Authorization' : userToken,
          'Content-Type' : 'application/json'
        }
      })
      if(response.status === 200){
        await GoogleSignin.signOut();
        dispatch(logout());
      }
    }
    catch(error) {
      if(error.response && error.response.status === 403){
        handleRefreshToken();
      }
      else{
        setError(true)
        setErrorMessage(`Mensaje: ${error.message} \nCodigo de error:  ${error.code}`)
      }
    }
  }

  return (<View style={styles.container}>
    {(!error) ? <>
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
        onPress: () => handleDeleteAccount(),
      }}
      closeButton={{
        title: 'Cancelar',
        close: () => setModalDeleteAccVisible(false),
      }}
    /></>
   : 
   <InternalError onButtonClick={loadProfileInfo}/>
   }
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
