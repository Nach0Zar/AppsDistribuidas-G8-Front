import React from 'react';
import { View, Text } from 'react-native';
import { COLOR } from '../styles/Theme';

const MovieSearch = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#31363F' }}>
      <Text style={{color: COLOR.second}}>MovieSearch Screen</Text>
    </View>
  );
};

export default MovieSearch;