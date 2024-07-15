import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";

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
            const {firstname, lastname, email, nickname, favorites} = payload
            state.userInfo.firstname = firstname;
            state.userInfo.lastname = lastname;
            state.userInfo.email = email;
            state.userInfo.nickname = nickname;
            state.userInfo.favorites = favorites;
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
        },
        updateFavoritesList : (state, action) => {
            state.userInfo.favorites = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        //Login User
        .addCase(userLogin.pending, (state) =>{
            state.loading = true
            state.error = null
        })
        .addCase(userLogin.fulfilled, (state, {payload}) => {
            state.loading = false
            state.userInfo = payload.userData
            state.userToken = payload.userToken
            state.refreshToken = payload.refreshToken
        })
        .addCase(userLogin.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload
        })
    }
})

export const {isLoading, logout, setUserInfo, setRefreshToken, setUserImage, setUserToken, updateFavoritesList} = authSlice.actions;

export default authSlice.reducer;