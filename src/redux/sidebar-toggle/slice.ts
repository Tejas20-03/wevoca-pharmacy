import { createSlice } from '@reduxjs/toolkit';

export interface sidebarToggle {
    openSidebar: boolean
}


const initialState: sidebarToggle = {
    openSidebar: false
}

const sidebarToggleSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        openSidebarToggle: (state) => {
            state.openSidebar = true;
        },
        closeSidebarToggle: (state) => {
            state.openSidebar = false;
        }
    }
});

export const { openSidebarToggle, closeSidebarToggle } = sidebarToggleSlice.actions;
export default sidebarToggleSlice.reducer;