import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favs from "../ui/screens/Favs";
import Details from "../ui/screens/Details";
import Routes from "./Routes";

const Stack = createNativeStackNavigator();

const FavStack = () => {
    return (
        <Stack.Navigator initialRouteName={Routes.FavsScreen} screenOptions={ {headerShown:false} }>
            <Stack.Screen
              name={Routes.FavsScreen}
              component={Favs}
            />
            <Stack.Screen
              name={Routes.DetailsScreen}
              component={Details}
            />
        </Stack.Navigator>
    )

}
export default FavStack;