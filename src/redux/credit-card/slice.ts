import { createSlice } from '@reduxjs/toolkit';
import { CreditCardApiDataType } from '@/services/credit-card/types';
import { HYDRATE } from 'next-redux-wrapper';
import { setCreditCard } from './reducer';

const intialState: CreditCardSliceType = {
  selected: null,
};

const creditCardSlice = createSlice({
  name: 'creditCard',
  initialState: intialState,
  reducers: { setCreditCard },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state) => {
      // Update the state based on the HYDRATE action
      return { ...state };
    });
  },
});

export default creditCardSlice;
export const creditCardActions = creditCardSlice.actions;
export type CreditCardSliceType = {
  selected: CreditCardApiDataType | null;
};
