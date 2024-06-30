import {StyleSheet, Dimensions} from 'react-native';
import { COLOR } from './Theme';

const { width, height } = Dimensions.get('window');

const movieSearchStyles = StyleSheet.create({
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
  input: {
    flex: 1,
    height: height * 0.055,
    borderRadius: 20,
    paddingHorizontal: width * 0.04,
    marginHorizontal: width * 0.046,
    backgroundColor: COLOR.second,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center'
  },
  noResultsContainer: {
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLOR.second,
    marginVertical: height * 0.10,
    marginBottom: height * 0.02,
  },
  noResultsSubtitle: {
    fontSize: 18,
    color: COLOR.second,
    textAlign: 'center',
    marginHorizontal: width * 0.07
  },
  title: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.0641,
    marginVertical: height * 0.025,
    backgroundColor: COLOR.primaryBackground,
  },
  titleText: {
    color: COLOR.second,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
  
export default movieSearchStyles;