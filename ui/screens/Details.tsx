import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

export interface MovieProps {
  route: {
    params: {
      id: String
    }
  }
}

const Details = (props: MovieProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen {props.route.params.id}</Text>
    </View>
  );
};

export default Details;