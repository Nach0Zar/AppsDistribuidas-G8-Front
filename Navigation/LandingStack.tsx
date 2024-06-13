import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from './HomeStack';
import Favs from "../ui/screens/Favs";
import Routes from "./Routes";
import ProfileStack from "./ProfileStack";
import { COLOR } from "../ui/styles/Theme";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar, faUser as regularUser } from "@fortawesome/free-regular-svg-icons";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const LandingStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.HomeStack}
      screenOptions={{
        headerShown:false,
        tabBarStyle: {backgroundColor: COLOR.secondBackground},
      }}
    >
      <Tab.Screen
        name = {Routes.HomeStack}
        component={HomeStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size}) => (
            focused ? (
              <Image
                source={require('../assets/images/house-solid.png')}
                style={{ width: 24, height: 24, tintColor: COLOR.second }}
              />
            ) : (
              <Image
                source={require('../assets/images/house.png')}
                style={{ width: 24, height: 24, tintColor: COLOR.second }}
              />
            )
          ),
          tabBarIconStyle: { marginTop: 8, alignSelf: 'center' }
        }}
      />
      <Tab.Screen
        name={Routes.FavsScreen}
        component={Favs}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesomeIcon 
              icon={focused ? faStar : regularStar} 
              size={24} 
              color={ COLOR.second }/>  
          ),
          tabBarIconStyle: { marginTop: 8, alignSelf: 'center' }
        }}
      />
      <Tab.Screen
        name={Routes.ProfileStack}
        component={ProfileStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color,size}) => (
            <FontAwesomeIcon 
              icon={focused ? faUser: regularUser} 
              size={24} 
              color={ COLOR.second }/>     
          ),
          tabBarIconStyle: { marginTop: 8, alignSelf: 'center' }
        }}
      />
    </Tab.Navigator>
  )
}
export default LandingStack;