import { createSlice } from '@reduxjs/toolkit';

export interface Promo {
    toast: boolean
}


const initialState: Promo = {
    toast: false
}

const ToastMessageSlice = createSlice({
    name: 'Toast',
    initialState,
    reducers: {
        toastMessage: (state) => {
            state.toast = true;
        },
        hideToastMessage: (state) => {
            state.toast = false;
        }
    }
});

export const { toastMessage, hideToastMessage } = ToastMessageSlice.actions;
export default ToastMessageSlice.reducer;