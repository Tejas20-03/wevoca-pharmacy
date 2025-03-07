import { PayloadAction } from '@reduxjs/toolkit';
import { StoreSliceType } from './slice';

type stateType = StoreSliceType;
type actionType = PayloadAction<Partial<StoreSliceType>>;

export const setStore = (state: stateType, action: actionType) => {
    const { selectedStoreCode, selectedStoreID, selectedStoreDeliveryTime, selectedStoreDeliveryCharges, selectedStoreDeliveryChargesWaiveAfter, selectedStoreLocation } = action.payload;
    state.selectedStoreCode = (selectedStoreCode !== undefined) ? selectedStoreCode : state.selectedStoreCode;
    state.selectedStoreID = (selectedStoreID !== undefined) ? selectedStoreID : state.selectedStoreID;
    state.selectedStoreDeliveryTime = (selectedStoreDeliveryTime !== undefined) ? selectedStoreDeliveryTime : state.selectedStoreDeliveryTime;
    state.selectedStoreDeliveryCharges = (selectedStoreDeliveryCharges !== undefined) ? selectedStoreDeliveryCharges : state.selectedStoreDeliveryCharges;
    state.selectedStoreDeliveryChargesWaiveAfter = (selectedStoreDeliveryChargesWaiveAfter !== undefined) ? selectedStoreDeliveryChargesWaiveAfter : state.selectedStoreDeliveryChargesWaiveAfter;
    state.selectedStoreLocation = (selectedStoreLocation !== undefined) ? selectedStoreLocation : state.selectedStoreLocation;
};
