import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import homeStyles from '../styles/homeStyles';
import { useNavigation } from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import Routes from '../../Navigation/Routes';
import { COLOR } from '../styles/Theme';

const Home = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

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
        <Text style={{color: COLOR.second}}>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;