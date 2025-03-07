import { createSlice } from '@reduxjs/toolkit';

export interface PermissionDeninedPopupProps {
    permissionDeninedPopup: boolean,
}


const initialState: PermissionDeninedPopupProps = {
    permissionDeninedPopup: false,
}

const permissionDenined = createSlice({
    name: 'PermissionDenined',
    initialState,
    reducers: {
        openPermissionDenined: (state) => {
            state.permissionDeninedPopup = true;
        },
        closePermissionDenined: (state) => {
            state.permissionDeninedPopup = false;
        },
    }
});

export const { openPermissionDenined, closePermissionDenined } = permissionDenined.actions;
export default permissionDenined.reducer;