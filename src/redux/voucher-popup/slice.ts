import { createSlice } from '@reduxjs/toolkit';

export interface VoucherPopup {
    openVoucherPopup: boolean,
}


const initialState: VoucherPopup = {
    openVoucherPopup: false,
}

const VoucherSlice = createSlice({
    name: 'Voucher',
    initialState,
    reducers: {
        openVoucher: (state) => {
            state.openVoucherPopup = true;
        },
        closeVoucher: (state) => {
            state.openVoucherPopup = false;
        },
    }
});

export const { openVoucher, closeVoucher } = VoucherSlice.actions;
export default VoucherSlice.reducer;