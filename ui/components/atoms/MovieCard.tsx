import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { COLOR } from '../../styles/Theme';

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    image: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <View style={styles.cardContainer}>
      <Image source={require('../../../assets/images/wick1.jpg')} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{movie.title}</Text>
  </View>
);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    
  },
  cardImage: {
    height: height * 0.22,
    width: width * 0.256,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  cardTitle:{
    textAlign: 'center',
    color: COLOR.second,
  }
});

export default MovieCard;