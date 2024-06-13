import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Global } from '../Constants';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from '../redux/slices/authSlice';

export const refreshToken = async () => {
  console.log('Refresh token: ' + refreshToken)
  const {refreshToken} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log('Refresh token: ' + refreshToken)
  try{
    const refreshTokenResponse = await axios.put(
      Global.BASE_URL + '/auths',
      {refreshToken: refreshToken,}
    );

    if(refreshTokenResponse.status === 200){
      console.log(JSON.stringify(refreshTokenResponse));
      dispatch(setUserToken(refreshTokenResponse))
    }
  }catch(error){
    console.log('Sucedio un error al refrescar: ' + error.message);
  }
};

