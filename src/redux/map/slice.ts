import { createSlice } from '@reduxjs/toolkit';
import { setMap } from './reducer';

export const mapInitialState: MapSliceType = {
  selectedAddress: '',
  selectedAddressFullArray: [],
  isFocusedOnLocationSearchInput: false,
  selectedGeocode: { latitude: 24.8835915, longitude: 67.0557079 },
  region: { latitude: 24.8835915, longitude: 67.0557079, latitudeDelta: 0.005, longitudeDelta: 0.005 },
};

const mapSlice = createSlice({
  name: 'map',
  initialState: mapInitialState,
  reducers: { setMap },
});

export default mapSlice;
export const mapActions = mapSlice.actions;
export type MapSliceType = {
  selectedAddress: string;
  selectedAddressFullArray: string[];
  isFocusedOnLocationSearchInput: boolean;
  selectedGeocode: { latitude: number; longitude: number };
  region: { latitude: number; longitude: number, latitudeDelta?: number, longitudeDelta?: number };
};
