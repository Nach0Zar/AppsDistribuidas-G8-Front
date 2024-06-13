import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {ProfileInfo} from '../components/molecules/ProfileInfo';
import {COLOR} from '../styles/Theme';
import { PressableText } from '../components/atoms/PressableText';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';

export const EditProfileScreen = () => {
  
  
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <PressableText text='Cancelar' onPress={() => navigation.dispatch(StackActions.replace(Routes.ProfileInfo))}/>
      </View>
      <ProfileInfo/>
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
