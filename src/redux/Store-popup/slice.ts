import { createSlice } from '@reduxjs/toolkit';

export interface StorePopup {
    popup: boolean,
}


const initialState: StorePopup = {
    popup: false,
}


const StoreSlice = createSlice({
    name: 'store-popup',
    initialState,
    reducers: {
        openStorePopup: (state) => {
            state.popup = true;
        },
        closeStorePopup: (state) => {
            state.popup = false;
        }
    }
});

export const { openStorePopup, closeStorePopup } = StoreSlice.actions;
export default StoreSlice.reducer;