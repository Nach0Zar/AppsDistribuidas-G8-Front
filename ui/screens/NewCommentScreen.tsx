import {Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import COLORS, {COLOR} from '../styles/Theme';
import React, { useEffect, useState } from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import detailsStyle from '../styles/detailsStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faPlay} from '@fortawesome/free-solid-svg-icons';
import { Rating } from 'react-native-ratings';
import ConnectionStatus from '../assets/ConnectionStatus';
import Routes from '../../Navigation/Routes';
import axios from 'axios';
import { Global } from '../../Constants';
import { useSelector } from 'react-redux';

interface props {
  movieId: number
}


export const NewCommentScreen = ({movieId} : props) => {
  //TODO: Pendiente postear comentario
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [comment, onChangeComment] = useState<string>('');
  const { userInfo, userToken, refreshToken  } = useSelector((state : any) => state.auth);
  const [rating, setRating] = useState<number>(0);

  useEffect(()=> {
    console.log(rating)
    
  },[rating])


  const handlePostComment = async() => {
    try{
      let connectionStatus = await ConnectionStatus()
      if(!connectionStatus){
        navigation.dispatch(StackActions.replace(Routes.InternetError));
      }
      const response = await axios.post(Global.BASE_URL + '/comments',
        {
          userId: "666a46e762ba014993cc5c0b",
          movieId: movieId,
          message: comment,
          date: new Date(),
          qualification: rating
        }
        ,{
        headers: {
          'Authorization' : userToken,
          'Content-Type' : 'application/json'
        }
      }, )
      if(response.status === 200){
        navigation.goBack();
      }
    }
    catch(error : any) {
      if(error.response && error.response.status === 403){
        //TODO: Hacer refresh
        //handleRefreshToken();
      }
      else{
        //Error de server?
      }
    }
  }

  return (
    <SafeAreaView style={detailsStyle.container}>
    <View style={detailsStyle.header}>
      <View style={style.headerContainer}>
        <View style={style.left}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              size={24}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <Text style={style.title}>Agrega tu comentario</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('hola')}>
          <FontAwesomeIcon
            icon={faPlay}
            size={24}
            color={COLORS.white}
            style={{alignSelf: 'flex-end'}}
          />
        </TouchableOpacity>
        
      </View>
    </View>
    <View style={style.ratingContainer}>
      <Rating
            ratingCount={5}
            type="custom"
            tintColor={COLOR.primaryBackground}
            imageSize={55}
            startingValue={0}
            ratingBackgroundColor={COLOR.secondBackground}
            ratingColor={COLOR.second}
            onFinishRating={setRating}
      />
      
    </View>
    <TextInput value={comment} onChangeText={onChangeComment} style={style.commentInput} placeholder='Tu comentario' placeholderTextColor={COLOR.second}/>
    </SafeAreaView>
    
  );
  
};

const style = StyleSheet.create({
  title: {
    color: COLOR.second,
    fontSize: 18,
    marginLeft: 5,
  },
  headerContainer: {
    flex: 1,
    flexBasis: '65%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left:{
    flexDirection: 'row'
  },
  ratingContainer:{
    borderBottomWidth: 0.4,
    borderBottomColor: COLOR.second
  },
  commentInput: {
    color: COLOR.second,
    fontSize: 16
  }
});
