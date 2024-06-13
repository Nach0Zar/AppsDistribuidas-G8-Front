import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import GoogleSignIn from '../../ui/assets/GoogleSignIn';
import {Global} from '../../Constants';

export const userLogin = createAsyncThunk(
  'auth/login',
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
      refreshToken: postAuthResponse.data.refreshToken,
      userData: getUserResponse.data,
    };

    return payload;
  },
);

