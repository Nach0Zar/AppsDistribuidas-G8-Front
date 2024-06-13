import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import loginStyles from '../styles/loginStyles';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import Routes from '../../Navigation/Routes';
import {useDispatch, useSelector} from 'react-redux';
import { userLogin } from '../../redux/slices/authActions';
import { isLoading } from '../../redux/slices/authSlice';


const Login = () => {
  const {loading, userToken, error} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  
  useEffect(() => {
    dispatch(isLoading(true))
    if (userToken != null){
      navigation.dispatch(StackActions.replace(Routes.LandingStack));
    }
    dispatch(isLoading(false))
    }, [userToken])
  
  const onHandleSignIn = () => {
    dispatch(userLogin());
  };


  return (
    <>
        <SafeAreaView style={loginStyles.container}>
          <Image
            style={loginStyles.logo}
            source={require('../../assets/images/logo.png')}
          />
          <Text style={loginStyles.message}>Accede para ver el contenido</Text>
          {!loading ? 
            <TouchableOpacity
              onPress={() => onHandleSignIn()}
              style={loginStyles.googleButton}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../assets/images/google_icon_32.png')}
                  style={loginStyles.buttonImage}
                />
                <Text style={loginStyles.googleButtonText}>Iniciar sesion</Text>
              </View>
            </TouchableOpacity>
          :<ActivityIndicator size="large" />}
        </SafeAreaView>
      
    </>
  );
};

export default Login;
