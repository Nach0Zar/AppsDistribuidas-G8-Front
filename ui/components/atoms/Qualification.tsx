import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLOR} from '../../styles/Theme';
import {Rating} from 'react-native-ratings';

interface props  {
    rating : number
}


export const Qualification = (props : props) => {
  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        <Rating
          readonly
          ratingCount={5}
          type="custom"
          tintColor={COLOR.primary}
          imageSize={23}
          startingValue={props.rating}
            ratingBackgroundColor={COLOR.second}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
  },
});
