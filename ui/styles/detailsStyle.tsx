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
    flexBasis: '28%',
  },
  detailsContainer:{
    flex: 1,
    justifyContent: 'flex-start',
    width: width * 0.95,
    alignSelf: 'center',
    flexBasis: '18%',
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
  ratingContainer: {
    flex:1, 
    flexDirection: 'row', 
    maxWidth: 90, 
    justifyContent: 'space-around', 
    alignContent: 'center'
  }
  ,
  label: {
    fontSize: 16,
    height: 20,
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
    paddingBottom: 3
  },
  hr: {
    borderBottomColor: COLOR.second,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 20
  },
  casters: {
    flex : 1
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  tab: {
    fontSize: 18,
    color: 'gray',
    paddingBottom: 5,
  },
  activeTab: {
    color: COLOR.second,
    borderBottomWidth: 2,
    borderBottomColor: COLOR.primary,
  },
});
  
export default detailsStyle;