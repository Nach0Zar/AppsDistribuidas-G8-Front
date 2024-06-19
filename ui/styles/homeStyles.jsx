import {StyleSheet, Dimensions} from 'react-native';
import { COLOR } from './Theme';

const { width, height } = Dimensions.get('window');

const homeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLOR.primaryBackground,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: COLOR.secondBackground,
      height: height * 0.071,
    },
    userName: {
      color: COLOR.second,
      fontSize: 18,
      marginLeft: 14
    },
    input: {
      flex: 1,
      height: height * 0.055,
      borderRadius: 20,
      paddingHorizontal: width * 0.04,
      marginHorizontal: width * 0.046,
      backgroundColor: COLOR.second,
    },
    chip: {
      marginHorizontal: 4,
      borderRadius: 40,
    },
    chipSelected: {
      backgroundColor: '#737373',
    },
    chipUnselected: {
      backgroundColor: 'transparent',
    },
    chipText: {
      color: COLOR.second
    },
    genreChipsContainer: {
      paddingVertical: 12,
      paddingHorizontal: 8,
    }
  });

  export default homeStyles;
  