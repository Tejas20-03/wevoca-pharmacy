import { createSlice } from '@reduxjs/toolkit';

export interface addressPopup {
    openPopup: boolean,
    activeSelectedTab: boolean,
    startingPopup: boolean,
    openStartingPopup: boolean,
}


const initialState: addressPopup = {
    openPopup: false,
    activeSelectedTab: true,
    startingPopup: true,
    openStartingPopup: false,
}

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        openAddressPopup: (state) => {
            state.openPopup = true;
            state.startingPopup = false
            state.openStartingPopup = true
        },
        closeAddressPopup: (state) => {
            state.openPopup = false;
        },
        addAddress: (state) => {
            state.activeSelectedTab = false
        },
        showSelectedTab: (state) => {
            state.activeSelectedTab = true
        },
        openAfterLogin: (state) => {
            state.openPopup = true;
        },
        showStartingPopup: (state) => {
            state.openPopup = true;
            state.activeSelectedTab = true
            state.startingPopup = true
        },
        closeStartingPopup: (state) => {
            state.openPopup = false;
            state.startingPopup = false
        },
        setOpenStartingPopup: (state) => {
            state.openStartingPopup = true;
        },
        closeOpenStartingPopup: (state) => {
            state.openStartingPopup = false;
        },
    }
});

export const { openAddressPopup, closeAddressPopup, addAddress, showSelectedTab, showStartingPopup, closeStartingPopup, setOpenStartingPopup, closeOpenStartingPopup } = addressSlice.actions;
export default addressSlice.reducer;