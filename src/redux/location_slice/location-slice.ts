import { createSlice } from "@reduxjs/toolkit";
import { LocationDataType } from "@/types/redux-types";
import { setCurrentLocationDenied, setSelectedAddress, setSelectedGeocode } from './location-reducer';

const initialState: LocationDataType = {
    selectedGeocode: { latitude: 24.8835915, longitude: 67.0557079 },
    selectedAddress: '',
    permissionDenied: null,
};

const locationSlice = createSlice({
    name: "location",
    initialState: initialState,
    reducers: {
        setSelectedGeocode,
        setSelectedAddress,
        setCurrentLocationDenied
    },
})

export const locationActions = locationSlice.actions;
export default locationSlice;
