import axios from 'axios';
import { Global } from '../Constants';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from '../redux/slices/authSlice';

export const refreshToken = async () => {
  const {refreshToken} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  try{
    const refreshTokenResponse = await axios.put(
      Global.BASE_URL + '/auths',
      {refreshToken: refreshToken,}
    );

    if(refreshTokenResponse.status === 200){
      dispatch(setUserToken(refreshTokenResponse))
    }
  }catch(error){
    console.log('Sucedio un error al refrescar: ' + error.message);
  }
};

