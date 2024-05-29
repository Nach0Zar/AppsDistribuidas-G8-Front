import {StyleSheet} from 'react-native';
import { COLOR } from './Theme';

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
      height: 60,
    },
    userName: {
      color: COLOR.second,
      fontSize: 18,
      marginLeft: 14
    },
    input: {
      flex: 1,
      height: 40,
      borderRadius: 20,
      paddingHorizontal: 20,
      marginHorizontal: 20,
      backgroundColor: COLOR.second,
    }
  });

  export default homeStyles;
  