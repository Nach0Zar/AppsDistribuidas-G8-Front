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

export const EditProfileScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => null}>
          <Text style={styles.pressableText}>Omitir por ahora</Text>
        </Pressable>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>Datos del usuario</Text>
        <Image
          style={styles.profileImage}
          source={{
            uri: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}></Image>

        <TextInput
          placeholder="Username"
          placeholderTextColor="grey"
          keyboardType="email-address"
          style={{
            fontSize: 15,
            height: 40,
            width: '75%',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginBottom: 14,
            backgroundColor: COLOR.second,
            marginTop: 23
          }}
        />
        <TextInput
          placeholder="Surname"
          placeholderTextColor="grey"
          keyboardType="email-address"
          style={{
            fontSize: 15,
            height: 40,
            width: '75%',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginBottom: 14,
            backgroundColor: COLOR.second,
          }}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="grey"
          keyboardType="email-address"
          style={{
            fontSize: 15,
            height: 40,
            width: '75%',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginBottom: 14,
            backgroundColor: COLOR.second,
          }}
        />
        <TextInput
          placeholder="Nickname"
          placeholderTextColor="grey"
          keyboardType="email-address"
          style={{
            fontSize: 15,
            height: 40,
            width: '75%',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: COLOR.second,
          }}
        />
      </View>

      <View style={{marginTop: 160, alignItems: 'center'}}>
        <CustomButton title='Guardar'></CustomButton>
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
  title: {
    fontSize: 20,
    fontWeight: 'semibold',
    marginBottom: 12,
    color: COLOR.second,
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 100,
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
  },
  buttonContainer: {
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    backgroundColor: 'orange',
    flex: 1,
  },
  topButtonContainer: {},
  topButton: {
    text: {},
  },
});
