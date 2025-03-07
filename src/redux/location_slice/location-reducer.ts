import { CaseReducer, current, PayloadAction } from '@reduxjs/toolkit';
import { LocationDataType, selectedGeocodeType } from '@/types/redux-types';

const setSelectedGeocode: CaseReducer<LocationDataType, PayloadAction<selectedGeocodeType>> = (state, action) => {

  return { ...current(state), selectedGeocode: { latitude: Number(action.payload), longitude: Number(action.payload) } };
};

const setSelectedAddress: CaseReducer<LocationDataType, PayloadAction<string>> = (state, action) => {
  return { ...current(state), selectedAddress: action.payload };
};
const setCurrentLocationDenied: CaseReducer<LocationDataType, PayloadAction<boolean>> = (state, action) => {
  return { ...current(state), permissionDenied: action.payload };
};

export { setSelectedGeocode, setSelectedAddress, setCurrentLocationDenied };
