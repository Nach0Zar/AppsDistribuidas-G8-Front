import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from './HomeStack';
import { faHouse, faStar, faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Favs from "../ui/screens/Favs";
import Profile from "../ui/screens/Profile";
import { faHouse as regularHouse, faStar as regularStar, faUser as regularUser} from "@fortawesome/free-solid-svg-icons";
import Routes from "./Routes";

const Tab = createBottomTabNavigator();

const LandingStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.HomeStack}
      screenOptions={{
        headerShown:false,
        tabBarStyle: {backgroundColor: '#222831'},
      }}
    >
      <Tab.Screen
        name = {Routes.HomeStack}
        component={HomeStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesomeIcon 
              icon={focused ? faHouse : regularHouse} 
              size={24} 
              color='#EEEEEE'/>
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
              color='#EEEEEE'/>  
          ),
          tabBarIconStyle: { marginTop: 8, alignSelf: 'center' }
        }}
      />
      <Tab.Screen
        name={Routes.ProfileScreen}
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color,size}) => (
            <FontAwesomeIcon 
              icon={focused ? faUser: regularUser} 
              size={24} 
              color='#EEEEEE'/>     
          ),
          tabBarIconStyle: { marginTop: 8, alignSelf: 'center' }
        }}
      />
    </Tab.Navigator>
  )
}
export default LandingStack;