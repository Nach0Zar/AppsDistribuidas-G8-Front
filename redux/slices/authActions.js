import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import GoogleSignIn from '../../ui/assets/GoogleSignIn';
import {Global} from '../../Constants';

export const userLogin = createAsyncThunk(
  'auth/login',
  async () => {
    await GoogleSignIn.signIn();
    const newTokens = await GoogleSignIn.getTokens();
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

