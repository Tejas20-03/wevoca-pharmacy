import { createSlice } from '@reduxjs/toolkit';

export interface Promo {
    promoCode: string
}


const initialState: Promo = {
    promoCode: ''
}

const PromoSlice = createSlice({
    name: 'promoCode',
    initialState,
    reducers: {
        AddPromo: (state, action) => {
            state.promoCode = action.payload;
        },
        removePromo: (state) => {
            state.promoCode = '';
        },
    }
});

export const { AddPromo, removePromo } = PromoSlice.actions;
export default PromoSlice.reducer;