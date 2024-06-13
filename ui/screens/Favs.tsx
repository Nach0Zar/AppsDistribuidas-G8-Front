import React from 'react';
import { View, Text } from 'react-native';
import { COLOR

 } from '../styles/Theme';
const Favs = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.primaryBackground }}>
      <Text style={{color: COLOR.second}}>Favs Screen</Text>
    </View>
  );
};

export default Favs;