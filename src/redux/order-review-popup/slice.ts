import { GetOrderDetail_DetailsDataType } from '@/services/order/types';
import { createSlice } from '@reduxjs/toolkit';

export interface ProductOrderReview {
  orderProductReviewPopup: boolean;
  orderId: string;
  OrderDetailID: string;
  orderDetailData?: GetOrderDetail_DetailsDataType | null;
}

const initialState: ProductOrderReview = {
  orderProductReviewPopup: false,
  orderId: '',
  OrderDetailID: '',
  orderDetailData: null,
};

const OrderProductReviewSlice = createSlice({
  name: 'OrderProductReview-updated',
  initialState,
  reducers: {
    openProductReview: (state) => {
      state.orderProductReviewPopup = true;
    },
    closeProductReview: (state) => {
      state.orderProductReviewPopup = false;
    },
    addProductReview: (state, action) => {
      const { orderId, OrderDetailID, orderDetailData } = action.payload;
      state.orderId = orderId !== undefined ? orderId : state.orderId;
      state.OrderDetailID = OrderDetailID !== undefined ? OrderDetailID : state.OrderDetailID;
      state.orderDetailData = orderDetailData !== null ? orderDetailData : state.orderDetailData;
    },
  },
});

export const { openProductReview, closeProductReview, addProductReview } = OrderProductReviewSlice.actions;
export default OrderProductReviewSlice.reducer;
