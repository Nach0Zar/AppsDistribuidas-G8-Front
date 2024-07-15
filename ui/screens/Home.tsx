import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Text } from 'react-native';
import homeStyles from '../styles/homeStyles';
import { useNavigation } from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import Routes from '../../Navigation/Routes';
import InternalError from './errors/InternalError';
import { COLOR } from '../styles/Theme';
import { useSelector } from 'react-redux';

const Home = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [homeLoaded, setHomeLoaded] = useState<boolean>(false);
  const {userInfo, userToken, refreshToken} = useSelector(
    (state: any) => state.auth,
  );
  const loadHome = async () => {
    return false;//forzar pagina de error ya que el home no esta hecho
  }
  useEffect(() => {
    if(!homeLoaded){
      loadHome().then(status => {setHomeLoaded((status === null) ? false : status)});
    }
    console.log(userToken)
  }, [homeLoaded]);
  return (
    <SafeAreaView style={homeStyles.container}>
      <View style={homeStyles.header}>
        <TextInput 
          style={homeStyles.input}
          placeholder="Ingrese nombre de pelicula o actor..."
          onPress={() => navigation.push(Routes.MovieSearchScreen)}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {(!homeLoaded) ? <InternalError onButtonClick={loadHome}/> : <Text style={{color: COLOR.second}}>Home Loaded!</Text>}
      </View>
    </SafeAreaView>
  );
};

export default Home;