import { createSlice } from '@reduxjs/toolkit';

export interface cartRemovePopup {
    cartPopup: boolean,
    cartPopup2: boolean,
    addressId: string,
}


const initialState: cartRemovePopup = {
    cartPopup: false,
    cartPopup2: false,
    addressId: '',
}

const cartSlice = createSlice({
    name: 'cart-popup',
    initialState,
    reducers: {
        openCartPopup: (state, action) => {
            state.cartPopup = true;
            state.addressId = action.payload
        },
        openCartPopup2: (state) => {
            state.cartPopup2 = true;
        },
        closeCartPopup: (state) => {
            state.cartPopup = false;
        },
        closeCartPopup2: (state) => {
            state.cartPopup2 = false;
        }
    }
});

export const { openCartPopup, openCartPopup2, closeCartPopup, closeCartPopup2 } = cartSlice.actions;
export default cartSlice.reducer;