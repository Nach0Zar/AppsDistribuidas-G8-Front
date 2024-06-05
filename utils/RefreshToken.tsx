import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Global } from '../Constants';

export const refreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem(Global.REFRESH_TOKEN);

  axios
    .put(Global.BASE_URL + '/auths', {
      refreshToken: refreshToken,
    })
    .then(async (response) => {
      const {jwt, refreshToken} = response.data;
      try{
        await AsyncStorage.setItem(Global.JWT_TOKEN, jwt);
        await AsyncStorage.setItem(Global.REFRESH_TOKEN, refreshToken);
      }
      catch(error){
        console.log('Ocurrio un error al intentar guardar access y refresh token en local storage');
      }
      console.log(response);
    })
    .catch(error => {
      console.log('Ocurrio un error al refrescar el token');
    });
};

