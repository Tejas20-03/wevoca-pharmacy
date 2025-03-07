import { createSlice } from '@reduxjs/toolkit';

export interface SavedCardPopupProps {
    openSavedCardPopup: boolean,
}


const initialState: SavedCardPopupProps = {
    openSavedCardPopup: false,
}

const SavedCardSlice = createSlice({
    name: 'SavedCard',
    initialState,
    reducers: {
        openSavedCard: (state) => {
            state.openSavedCardPopup = true;
        },
        closeSavedCard: (state) => {
            state.openSavedCardPopup = false;
        },
    }
});

export const { openSavedCard, closeSavedCard } = SavedCardSlice.actions;
export default SavedCardSlice.reducer;