import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../ui/screens/Home";
import MovieSearch from "../ui/screens/MovieSearch";
import Details from "../ui/screens/Details";
import Routes from "./Routes";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName={Routes.HomeScreen} screenOptions={ {headerShown:false} }>
            <Stack.Screen
              name={Routes.HomeScreen}
              component={Home}
            />
            <Stack.Screen
              name={Routes.DetailsScreen}
              component={Details}
            />
            <Stack.Screen
              name={Routes.MovieSearchScreen}
              component={MovieSearch}
            />
        </Stack.Navigator>
    )

}
export default HomeStack;