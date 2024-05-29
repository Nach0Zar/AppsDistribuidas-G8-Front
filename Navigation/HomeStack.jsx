import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../ui/screens/Home";
import MovieSearch from "../ui/screens/MovieSearch";
import Details from "../ui/screens/Details";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={ {headerShown:false} }>
            <Stack.Screen
              name="Home"
              component={Home}
            />
            <Stack.Screen
              name="Details"
              component={Details}
            />
            <Stack.Screen
              name="MovieSearch"
              component={MovieSearch}
            />
        </Stack.Navigator>
    )

}
export default HomeStack;