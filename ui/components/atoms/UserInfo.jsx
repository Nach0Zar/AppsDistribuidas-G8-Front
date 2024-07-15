import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '../../styles/Theme';

export const UserInfo = ({username, userimage}) => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  return (
    <View style={styles.container}>
      {userimage ? (
        <Image
          style={styles.image}
          source={{
            uri: userimage
              ? userimage
              : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw154XIaURLCbUhyBzfeh8aj&ust=1717295665249000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIjf3YGvuYYDFQAAAAAdAAAAABAE',
          }}></Image>
      ) : (
        <ShimmerPlaceholder style={styles.image}/>
      )}
      {username ? (
        <Text style={styles.text}>@{username}</Text>
      ) : (
        <ShimmerPlaceholder shimmerColors={[COLOR.primary, COLOR.second, COLOR.primaryBackground]}/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
  },
  shimmer: {
    backgroundColor: 'red'
  }
});
