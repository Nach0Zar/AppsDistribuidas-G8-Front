import {StyleSheet, Dimensions} from 'react-native';
import { COLOR } from './Theme';

const { width, height } = Dimensions.get('window');

const detailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primaryBackground,
  },
  imageContainer:{
    flex: 1,
    flexBasis: '38%',
  },
  detailsContainer:{
    flex: 1,
    justifyContent: 'flex-start',
    width: width * 0.95,
    alignSelf: 'center',
    flexBasis: '32%'
  },
  commentsAndPeopleContainer:{
    flex: 1,
    width: width * 0.95,
    alignSelf: 'center',
    flexBasis: '30%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: COLOR.secondBackground,
    height: height * 0.071,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  title: {
    fontSize: 20,
    color: COLOR.second,
    fontWeight: 'bold',
    fontFamily: 'roboto',
    paddingTop: 10
  },
  subtitle: {
    fontSize: 14,
    color: COLOR.second,
    fontWeight: 'medium',
    fontFamily: 'roboto',
    paddingTop: 5
  },
  labelContainer: {
    flex:1, 
    flexDirection: 'row', 
    marginTop: 10,
    justifyContent: 'space-between', 
    alignItems: 'center',
    maxHeight: 20
},
  label: {
    fontSize: 16,
    height: 18,
    color: COLOR.second,
    fontWeight: 'medium',
    fontFamily: 'roboto'
  },
  synopsis: {
    fontSize: 14,
    color: COLOR.second,
    fontWeight: 'medium',
    fontFamily: 'roboto',
    paddingTop: 10,
    paddingBottom: 10
  },
  hr: {
    borderBottomColor: COLOR.second,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10
  }
});
  
export default detailsStyle;