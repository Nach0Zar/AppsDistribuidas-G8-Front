import {StyleSheet} from 'react-native';

const homeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#31363F',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#222831',
      height: 60,
    },
    userName: {
      color: '#EEEEEE',
      fontSize: 18,
      marginLeft: 14
    },
    input: {
      flex: 1,
      height: 40,
      borderRadius: 20,
      paddingHorizontal: 20,
      marginHorizontal: 20,
      backgroundColor: '#EEEEEE',
    }
  });

  export default homeStyles;
  