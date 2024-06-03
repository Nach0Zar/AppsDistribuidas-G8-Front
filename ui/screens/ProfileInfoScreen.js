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
import {useState} from 'react';
import {CustomModal} from '../components/organisms/CustomModal';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';
import GoogleSignIn from '../asset/GoogleSignIn';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const ProfileInfoScreen = () => {
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [modalDeleteAccVisible, setModalDeleteAccVisible] = useState(false);

  const navigation = useNavigation();
  const closeSession = async () => {
      GoogleSignIn.signOut();
      await AsyncStorage.clear();
      navigation.dispatch(StackActions.replace(Routes.LoginScreen));
  }

  //TODO: Obtener los datos del usuario, que no esten hardcodeados
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{
          uri: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}></Image>

      <View style={styles.buttonContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Juan Gutierrez</Text>
          <Text style={styles.text}>juangutierrez@gmail.com</Text>
          <Text style={styles.text}>juani94</Text>
        </View>
        <CustomButton
          title="Editar"
          onPress={() => navigation.push(Routes.EditProfile)}
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
        text="Estas seguro que queres cerrar la sesión?"
        actionButton={{
          title: 'Si, cerrar',
          onPress: () => closeSession(),
        }}
        closeButton={{
          title: 'Cancelar',
          close: () => setModalLogoutVisible(false),
        }}
      />
      <CustomModal
        isVisible={modalDeleteAccVisible}
        text="Estas seguro que queres eliminar tu cuenta?"
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
    alignItems: 'center',
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
    fontWeight: 'medium',
  },
  buttonContainer: {
    gap: 10,
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
