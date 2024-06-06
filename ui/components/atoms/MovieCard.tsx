import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { COLOR } from '../../styles/Theme';

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    default_poster: {
      aspect_radio: number,
      file_path: string,
      height: number,
      width: number,                  
    };
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <View style={styles.cardContainer}>
      <Image source={{uri: "https://image.tmdb.org/t/p/original"+ movie.default_poster.file_path}} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{movie.title}</Text>
  </View>
);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.256,
  },
  cardImage: {
    height: height * 0.22,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  cardTitle:{
    textAlign: 'center',
    color: COLOR.second,
    width: '100%',
    marginTop: 6
  }
});

export default MovieCard;