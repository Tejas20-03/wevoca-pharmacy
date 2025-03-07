import { createSlice } from '@reduxjs/toolkit';
import { ProductDataType } from '@/services/product/types';
import { setCart } from './reducer';
import { HYDRATE } from 'next-redux-wrapper';

export const cartSliceIntialState: CartSliceType = {
  cartProducts: [],
  subTotal: 0,
  platformFee: 0,
  deliveryCharges: 119,
  discount: 0,
  total: 0,
  appliedPromo: '',
  appliedPromoDiscount: 0,

};

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartSliceIntialState,
  reducers: { setCart },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state) => {
      // Update the state based on the HYDRATE action
      return { ...state };
    });
  },
});


export default cartSlice;
export const cartActions = cartSlice.actions;
export type CartSliceType = {
  cartProducts: CartProductType[];
  subTotal: number;
  platformFee: number;
  deliveryCharges: number;
  discount: number;
  total: number;
  appliedPromo: string;
  appliedPromoDiscount: number;
  createdAt?: Date;
};
export type CartProductType = {
  id: string;
  slug?: string;
  quanity: number;
  data: ProductDataType;
  perStrip: boolean | undefined
};
