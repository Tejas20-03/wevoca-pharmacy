import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { setStore } from './reducer';

export const storeSliceIntialState: StoreSliceType = {
  selectedStoreCode: '32',
  selectedStoreID: null,
  selectedStoreDeliveryTime: 60,
  selectedStoreDeliveryCharges: 119,
  selectedStoreDeliveryChargesWaiveAfter: 1350,
  selectedStoreDeliveryChargesStatus: true,
  selectedStoreLocation: ''
};

const storeSlice = createSlice({
  name: 'store',
  initialState: storeSliceIntialState,
  reducers: { setStore },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state) => {
      // Update the state based on the HYDRATE action
      return { ...state };
    });
  },
});

export default storeSlice;
export const storeActions = storeSlice.actions;
export type StoreSliceType = {
  selectedStoreCode: string;
  selectedStoreID: number | null;
  selectedStoreDeliveryTime: number;
  selectedStoreDeliveryCharges: number;
  selectedStoreDeliveryChargesWaiveAfter: number;
  selectedStoreDeliveryChargesStatus: boolean;
  selectedStoreLocation?: string;
};
