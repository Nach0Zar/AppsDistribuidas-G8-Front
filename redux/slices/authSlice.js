import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Global } from "../../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogOut, userLogin } from "./authActions";

//const userToken = await AsyncStorage.getItem(Global.JWT_TOKEN) ? AsyncStorage.getItem(Global.JWT_TOKEN) : null;

/*
type UserInfo = {
    firstname: String,
    lastname : String,
    email : String,
    nickname : String,
    image : String,
}
*/

//const userToken = await AsyncStorage.getItem(Global.JWT_TOKEN) ?  await AsyncStorage.getItem(Global.JWT_TOKEN) : null;

const initialState = {
    loading : false,
    userInfo : {},
    userToken : null,
    refreshToken : null,
    error : null,
    success : false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {
        isLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUserInfo: (state, {payload}) => {
            const {firstname, lastname, email, nickname} = payload
            state.userInfo.firstname = firstname;
            state.userInfo.lastname = lastname;
            state.userInfo.email = email;
            state.userInfo.nickname = nickname;
        },
        setUserImage : (state, {payload}) => {
            state.userInfo.image = payload;
        },
        logout: (state) => {
            state.loading = false,
            state.userInfo = {},
            state.userToken = null,
            state.refreshToken = null
            state.error = null
            state.success = false
        },
        setRefreshToken : (state, action) => {
            state.refreshToken = action.payload
        },
        setUserToken : (state, action) => {
            state.userToken = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        //Login User
        .addCase(userLogin.pending, (state) =>{
            state.loading = true
            state.error = null
            console.log("PENDING")
        })
        .addCase(userLogin.fulfilled, (state, {payload}) => {
            state.loading = false
            state.userInfo = payload.userData
            state.userToken = payload.userToken
            state.refreshToken = payload.refreshToken
            console.log('Jwt: ' + payload.userToken)
            console.log('RefreshToken: ' + payload.refreshToken)
            console.log("FULFILLED")
        })
        .addCase(userLogin.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload
            console.log("REJECTED: " + payload)
        })
    }
})

export const {isLoading, logout, setUserInfo, setRefreshToken, setUserImage, setUserToken} = authSlice.actions;

export default authSlice.reducer;