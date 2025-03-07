import { PayloadAction } from '@reduxjs/toolkit';
import { CartSliceType } from './slice';

type stateType = CartSliceType;
type actionType = PayloadAction<Partial<CartSliceType>>;

export const setCart = (state: stateType, action: actionType) => {
  const { cartProducts, subTotal, deliveryCharges, discount, total, appliedPromo, appliedPromoDiscount, platformFee } = action.payload;
  state.cartProducts = cartProducts !== undefined ? cartProducts : state?.cartProducts;
  state.deliveryCharges = deliveryCharges !== undefined ? deliveryCharges : state?.deliveryCharges;
  state.platformFee = platformFee !== undefined ? platformFee : state?.platformFee;
  state.subTotal = subTotal !== undefined ? subTotal : state?.subTotal;
  state.discount = discount !== undefined ? discount : state?.discount;
  state.total = total !== undefined ? total : state?.total;
  state.appliedPromo = appliedPromo !== undefined ? appliedPromo : state?.appliedPromo;
  state.appliedPromoDiscount = appliedPromoDiscount !== undefined ? appliedPromoDiscount : state?.appliedPromoDiscount;

  state.deliveryCharges = Number(state?.deliveryCharges.toFixed(2));
  state.platformFee = Number(state?.platformFee?.toFixed(2));
  state.subTotal = Number(state?.subTotal?.toFixed(2));
  state.discount = Number(state?.discount?.toFixed(2));
  state.total = Number(state?.total?.toFixed(2));
  state.appliedPromoDiscount = Number(state?.appliedPromoDiscount?.toFixed(2));
};
