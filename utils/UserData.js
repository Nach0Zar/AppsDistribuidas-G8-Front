import AsyncStorage from "@react-native-async-storage/async-storage";
import { Global } from "../Constants";
import React from "react";



export const getUserData = async ({setUserData}) => {
    const firstname = await AsyncStorage.getItem(Global.FIRSTNAME);
    const lastname = await AsyncStorage.getItem(Global.LASTNAME);
    const email = await AsyncStorage.getItem(Global.EMAIL);
    const nickname = await AsyncStorage.getItem(Global.NICKNAME);
    const image = await AsyncStorage.getItem(Global.IMAGE);
    setUserData({
      firstname: firstname,
      lastname : lastname,
      email: email,
      nickname: nickname,
      image: image
    })
  }