import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileInfoScreen } from "../ui/screens/ProfileInfoScreen";
import { EditProfileScreen } from "../ui/screens/EditProfileScreen";
import Routes from "./Routes";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName={Routes.ProfileInfo} screenOptions={ {headerShown:false} }>
            <Stack.Screen
              name={Routes.ProfileInfo}
              component={ProfileInfoScreen}
            />
            <Stack.Screen
              name={Routes.EditProfile}
              component={EditProfileScreen}
            />
        </Stack.Navigator>
    )

}
export default ProfileStack;