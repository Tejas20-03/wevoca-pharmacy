import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { setProducts } from './reducer';

export const productsSliceIntialState: ProductsSliceType = {
  arrangeForMeProductIDs: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState: productsSliceIntialState,
  reducers: { setProducts },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state) => {
      // Update the state based on the HYDRATE action
      return { ...state };
    });
  },
});

export default productsSlice;
export const productsActions = productsSlice.actions;
export type ProductsSliceType = {
  arrangeForMeProductIDs: number[];
};
