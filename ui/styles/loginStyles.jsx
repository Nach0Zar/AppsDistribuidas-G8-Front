import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#31363F',
    },
    logo: {
      height: 280,
      width: 280,
      marginBottom: 20,
    },
    message: {
      fontSize: 18,
      fontWeight: 'semibold',
      fontStyle: 'italic',
      color: 'white',
    },
    googleButton: {
      marginTop: 10,
      backgroundColor: '#76ABAE',
      paddingVertical: 15,
      paddingRight: 57,
      borderRadius: 7,
      paddingLeft: 6,
    },
    googleButtonText: {
      fontSize: 20,
      textAlign: 'center',
      color: '#222831',
      fontWeight: 'bold',
      marginLeft:45,
    },
    buttonImage: {
      marginLeft: 5,
    },
  });
  
  export default loginStyles;
  