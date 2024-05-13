import React, {useEffect} from 'react';
import { Text } from "react-native"
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return <>
  <Text style = {{fontSize:100, textAlign:"center"}}> Test </Text>
  </>
}

export default App;