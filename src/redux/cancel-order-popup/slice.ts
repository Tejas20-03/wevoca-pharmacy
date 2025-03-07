import { GetCancelReason_ResponseDataType } from '@/services/order/types';
import { createSlice } from '@reduxjs/toolkit';

export interface CancelOrderPopupProps {
    cancelOrderCardPopup: boolean,
    orderId: string,
    cancelReason: GetCancelReason_ResponseDataType[],
    selectedReason: string,
}


const initialState: CancelOrderPopupProps = {
    cancelOrderCardPopup: false,
    orderId: '',
    cancelReason: [],
    selectedReason: ''
}

const CancelOrderSlice = createSlice({
    name: 'CancelOrder',
    initialState,
    reducers: {
        openCancelOrder: (state) => {
            state.cancelOrderCardPopup = true;
        },
        closeCancelOrder: (state) => {
            state.cancelOrderCardPopup = false;
        },
        addCancelOrder: (state, action) => {
            const { orderId, cancelReason } = action.payload;
            state.orderId = orderId !== undefined ? orderId : state.orderId;
            state.cancelReason = cancelReason !== undefined ? cancelReason : state.cancelReason;
        },
        addSelectReason: (state, action) => {
            const { selectedReason } = action.payload;
            state.selectedReason = selectedReason !== undefined ? selectedReason : state.selectedReason
        }
    }
});

export const { openCancelOrder, closeCancelOrder, addCancelOrder, addSelectReason } = CancelOrderSlice.actions;
export default CancelOrderSlice.reducer;