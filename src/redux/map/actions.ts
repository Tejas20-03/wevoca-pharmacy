import { createAsyncThunk } from '@reduxjs/toolkit';
import { storeActions, storeSliceIntialState } from '@/redux/store/slice';

import { AsyncThunkConfig } from '@/redux/store';

const MapThunks = {
  GetUserCurrentLocationAndSetGeocode: 'map/getUserCurrentLocationAndSetGeocode',
};

export const getUserCurrentLocationAndSetGeocode = createAsyncThunk<void, {}, AsyncThunkConfig>(MapThunks.GetUserCurrentLocationAndSetGeocode, async ({}, { dispatch }) => {
  dispatch(storeActions.setStore(storeSliceIntialState));
});
