import { createSlice } from '@reduxjs/toolkit';

export interface LoginPopup {
    popup: boolean
    isOtpScreen: boolean,
    isAddToCartClicked: boolean,
    isOpenChatPopup: boolean
}


const initialState: LoginPopup = {
    popup: false,
    isOtpScreen: false,
    isAddToCartClicked: false,
    isOpenChatPopup: false,
}

const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        openLoginPopup: (state) => {
            state.popup = true;
        },
        closeLoginPopup: (state) => {
            state.popup = false;
            state.isOpenChatPopup = false
        },
        changeLoginScreen: (state, action) => {
            state.isOtpScreen = action.payload
        },
        openLoginPopupOnAddToCart: (state, action) => {
            state.isAddToCartClicked = action.payload
        },
        openLoginPopupOnChat: (state) => {
            state.popup = true;
            state.isOpenChatPopup = true
        }
    }
});

export const { openLoginPopup, closeLoginPopup, changeLoginScreen, openLoginPopupOnAddToCart, openLoginPopupOnChat } = LoginSlice.actions;
export default LoginSlice.reducer;