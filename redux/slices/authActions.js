import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import GoogleSignIn from '../../ui/asset/GoogleSignIn';
import {Global} from '../../Constants';

export const userLogin = createAsyncThunk(
  'auth/login',
  /*async({}, { rejectWithValue }) => {
        try{
            console.log("Google Sign In")
            await GoogleSignIn.signIn();
            const newTokens = await GoogleSignIn.getTokens();
            const config = {headers:{
                Authorization : newTokens.accessToken,
                'Content-Type' : 'application/json'
            }}
            console.log("Llamado al back /auths POST")
            const { data } = await axios.post(
                `${Global.BASE_URL}/auths`,{},config
            )
            //Guardamos el jwt en Local Storage
            await AsyncStorage.setItem(Global.JWT_TOKEN, data.jwt);
            return data;
        }catch(error){
            //Retornamos mensaje custom de error del backend si es que hay
            if(error.response && error.response.data.message){
                console.log("Error aca1")
                return rejectWithValue(error.response.data.message);
            }else{
                console.log("Error aca2")
                return rejectWithValue(error.message);
            }
        }
    }*/
    //TODO: Mejorar manejo de errores con los try, catch
  async () => {
    console.log('Google Sign In');
    await GoogleSignIn.signIn();
    const newTokens = await GoogleSignIn.getTokens();
    console.log('Google Access Token: ' + newTokens.accessToken);

    console.log('Llamado al back /auths POST');
    const postAuthResponse = await axios.post(
      Global.BASE_URL + '/auths',
      {},
      {
        headers: {
          Authorization: newTokens.accessToken,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Jwt: ' + postAuthResponse.data.jwt);
    //Guardamos el jwt en Local Storage porque redux si se muere lo perdemos
    await AsyncStorage.setItem(Global.JWT_TOKEN, postAuthResponse.data.jwt);

    console.log('Llamado al back /users GET');
    const getUserResponse = await axios.get(
      Global.BASE_URL + '/users',
      {
        headers: {
          Authorization: postAuthResponse.data.jwt,
          'Content-Type': 'application/json',
        },
      },
    );
    const payload = {
      userToken: postAuthResponse.data.jwt,
      userData: getUserResponse.data,
    };

    return payload;
  },
);
