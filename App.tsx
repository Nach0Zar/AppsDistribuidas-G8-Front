import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import RootNavigator from './Navigation/RootNavigator';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { store } from './redux/store';

const Stack = createNativeStackNavigator();

GoogleSignin.configure({
  webClientId:'1058795952414-kt6i0psmqpvc2rdbedbpe4ijk81hls1h.apps.googleusercontent.com',
  offlineAccess: true,
});

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  )
};
export default App;
