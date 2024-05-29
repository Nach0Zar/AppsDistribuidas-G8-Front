import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {Routes} from '../../navigation/Routes';
import {ProfileInfo} from '../components/molecules/ProfileInfo';
import {CustomButton} from '../components/atoms/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../styles/Theme';
import {ProfileImage} from '../components/atoms/ProfileImage';
import { PressableText } from '../components/atoms/PressableText';



export const EditProfileScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <PressableText text='Cancelar' onPress={() => navigation.goBack()}/>
      </View>
      <ProfileInfo/>
      <View style={{marginTop: 160, marginBottom: 10, alignItems: 'center'}}>
        <CustomButton title='Guardar' color={COLOR.black}></CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primaryBackground,
    flexDirection: 'column',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 59,
    marginTop: 25,
    marginRight: 10,
  },
  pressableText: {
    fontSize: 18,
    color: COLOR.second,
    fontWeight: 'medium',
    fontFamily: 'roboto',
  }
});
