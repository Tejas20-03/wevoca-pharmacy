import { PayloadAction } from '@reduxjs/toolkit';
import { MapSliceType } from './slice';

type stateType = MapSliceType;
type actionType = PayloadAction<Partial<MapSliceType>>;

export const setMap = (state: stateType, action: actionType) => {
    const { selectedAddress, selectedAddressFullArray, isFocusedOnLocationSearchInput, selectedGeocode, region } = action.payload;

    state.selectedAddress = (selectedAddress !== undefined) ? selectedAddress : state.selectedAddress;
    state.selectedAddressFullArray = (selectedAddressFullArray !== undefined) ? selectedAddressFullArray : state.selectedAddressFullArray;
    state.isFocusedOnLocationSearchInput = (isFocusedOnLocationSearchInput !== undefined) ? isFocusedOnLocationSearchInput : state.isFocusedOnLocationSearchInput;
    state.selectedGeocode = (selectedGeocode !== undefined) ? selectedGeocode : state.selectedGeocode;
    state.region = (region !== undefined) ? region : state.region;
};
