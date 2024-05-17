import * as React from 'react';
import { View, Text } from 'react-native';

const NewUser = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>New User Screen</Text>
    </View>
  );
};

export default NewUser;