import React from 'react';
import { View, Text } from 'react-native';
import { COLOR } from '../../styles/Theme';
import { Image } from "react-native";
import { CustomButton } from '../../components/atoms/CustomButton';

const InternalError = (props: any) => {
  return (
    <View style={{ flex: 1,  alignItems: 'center', padding: 60, justifyContent: 'space-evenly', backgroundColor: COLOR.primaryBackground }}>
        <Image
            source={require('../../../assets/images/internal-error.png')}
            style={{ tintColor: COLOR.primary }}
        />
      <Text style={{color: COLOR.second, textAlign: 'center', fontSize: 30}}>Se produjo un error</Text>
      <CustomButton title='Reintentar' color={COLOR.black} onPress={props.onButtonClick}></CustomButton>
    </View>
  );
};

export default InternalError;