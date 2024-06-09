import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Global } from "../../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "./authActions";

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



const initialState = {
    loading : false,
    userInfo : {},
    userToken : null,
    error : null,
    success : false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder
        //Login User
        .addCase(userLogin.pending, (state) =>{
            state.loading = true
            state.error = null
            console.log("PENDING")
        })
        .addCase(userLogin.fulfilled, (state, {payload}) => {
            console.log('Payload: ', payload)
            state.loading = false
            state.userInfo = payload.userData
            state.userToken = payload.userToken
            console.log("FULFILLED")
        })
        .addCase(userLogin.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload
            console.log("REJECTED: " + payload)
        })
    }
})

export default authSlice.reducer;