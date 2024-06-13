import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { COLOR } from '../../styles/Theme';
import { CustomButton } from '../../components/atoms/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import ConnectionStatus from '../../assets/ConnectionStatus';
import Routes from '../../../Navigation/Routes';
import { Image } from "react-native";

const InternetError = () => {
  const navigation = useNavigation();
  const [connection, setConnection] = useState<boolean>(false);
  useEffect(() => {
    if(connection){
        navigation.dispatch(
            StackActions.replace(Routes.LandingStack)
        );
    }
  }, [connection]);
  const retryConnection = async () => {
    let status = await ConnectionStatus();
    setConnection((status === null) ? false : status);
  }
  return (
    <View style={{ flex: 1,  alignItems: 'center', padding: 60, justifyContent: 'space-evenly', backgroundColor: COLOR.primaryBackground }}>
        <Image
            source={require('../../../assets/images/internet-error.png')}
            style={{ tintColor: COLOR.primary }}
        />
      <Text style={{color: COLOR.second, textAlign: 'center', fontSize: 30}}>Sin conexión a Internet</Text>
      <CustomButton title='Reintentar' color={COLOR.black} onPress={retryConnection}></CustomButton>
    </View>
  );
};

export default InternetError;