import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { GetOrderDetail_ResponseType } from '@/services/order/types';

export const orderDetailIntialState: OrderDetailType = {
  orderDetailData: null,
};

const orderDetailSlice = createSlice({
  name: 'user',
  initialState: orderDetailIntialState,
  reducers: {
    SaveOrderDetail: (state, action) => {
      state.orderDetailData = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state) => {
      // Update the state based on the HYDRATE action
      return { ...state };
    });
  },
});

export default orderDetailSlice;
export const { SaveOrderDetail } = orderDetailSlice.actions;
export type OrderDetailType = {
  orderDetailData: GetOrderDetail_ResponseType | null;
};
