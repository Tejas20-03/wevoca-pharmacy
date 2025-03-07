import { createSlice } from '@reduxjs/toolkit';

export interface chatEndPopupProps {
    chatEndPopup: boolean,
    chatOpenPopup: boolean,
}


const initialState: chatEndPopupProps = {
    chatEndPopup: false,
    chatOpenPopup: false,
}

const chatEndSlice = createSlice({
    name: 'chatEnd',
    initialState,
    reducers: {
        openchatEnd: (state) => {
            state.chatEndPopup = true;
        },
        closechatEnd: (state) => {
            state.chatEndPopup = false;
        },
        openChatPopupScreen: (state, action) => {
            state.chatOpenPopup = action?.payload;
        },
    }
});

export const { openchatEnd, closechatEnd, openChatPopupScreen } = chatEndSlice.actions;
export default chatEndSlice;