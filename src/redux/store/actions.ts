import Cookies from 'js-cookie';
import { CookieKeys } from '@/Constants/cookie-keys';

import { getBranchCodeByLatLng, getBranchCodeByLatLngSecond } from '@/services/stores/services';
import { deepClone } from '@/utils/lodash-methods';
import { storeActions, storeSliceIntialState } from '@/redux/store/slice';
import { AsyncThunkConfig } from '@/redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LogInfo } from '@/utils/dev-logging';
import { GetSavedProvinceInLocalStorage } from '@/functions/local-storage-methods';

const StoreThunks = {
  FetchAndSetNearestStoreData: 'store/fetchAndSetNearestStoreData',
};

export const fetchAndSetNearestStoreData = createAsyncThunk<string, { latitude: number; longitude: number }, AsyncThunkConfig>(StoreThunks.FetchAndSetNearestStoreData, async ({ latitude, longitude }, { dispatch }) => {
  const defaultStoreData = deepClone(storeSliceIntialState);
  const addressProvince = GetSavedProvinceInLocalStorage();
  const response_branchCodeByLatLng = await getBranchCodeByLatLng(latitude, longitude, {});
  if (response_branchCodeByLatLng && response_branchCodeByLatLng.ResponseType.toString() === '1') {
    if (response_branchCodeByLatLng.Data?.BranchCode) {
      defaultStoreData.selectedStoreCode = response_branchCodeByLatLng.Data?.BranchCode;
      Cookies.set(CookieKeys.BranchCode, response_branchCodeByLatLng.Data?.BranchCode, { expires: 400 });
    }
    if (response_branchCodeByLatLng.Data?.ID) defaultStoreData.selectedStoreID = response_branchCodeByLatLng.Data?.ID;
    if (response_branchCodeByLatLng.Data?.DeliveryMins) defaultStoreData.selectedStoreDeliveryTime = response_branchCodeByLatLng.Data?.DeliveryMins;
    if (response_branchCodeByLatLng.Data?.DeliveryFee) defaultStoreData.selectedStoreDeliveryCharges = Number(response_branchCodeByLatLng.Data?.DeliveryFee);
    if (response_branchCodeByLatLng.Data?.DeliveryFeeLimit) defaultStoreData.selectedStoreDeliveryChargesWaiveAfter = Number(response_branchCodeByLatLng.Data?.DeliveryFeeLimit);
    if (response_branchCodeByLatLng.Data?.Title) defaultStoreData.selectedStoreLocation = response_branchCodeByLatLng.Data?.Title;
    LogInfo('fetchAndSetNearestStoreData method', `Nearest Selected Store Data: ${defaultStoreData}`);
    dispatch(storeActions.setStore(defaultStoreData));
  } else if (response_branchCodeByLatLng?.Msg === "No Branch delivers in this area!") {
    const response_branchCodeByLatLngSecond = await getBranchCodeByLatLngSecond(addressProvince, {});
    if (response_branchCodeByLatLngSecond?.Data?.[0]?.BranchCode) {
      defaultStoreData.selectedStoreCode = response_branchCodeByLatLngSecond?.Data[0].BranchCode;
      Cookies.set(CookieKeys.BranchCode, response_branchCodeByLatLngSecond?.Data[0].BranchCode, { expires: 400 });
    }
    if (response_branchCodeByLatLngSecond?.Data[0].ID) defaultStoreData.selectedStoreID = Number(response_branchCodeByLatLngSecond?.Data[0].ID);
    if (response_branchCodeByLatLngSecond?.Data[0].DeliveryMins) defaultStoreData.selectedStoreDeliveryTime = Number(response_branchCodeByLatLngSecond?.Data[0].DeliveryMins);
    if (response_branchCodeByLatLngSecond?.Data[0].DeliveryFee) defaultStoreData.selectedStoreDeliveryCharges = Number(response_branchCodeByLatLngSecond?.Data[0].DeliveryFee);
    if (response_branchCodeByLatLngSecond?.Data[0].DeliveryFeeLimit) defaultStoreData.selectedStoreDeliveryChargesWaiveAfter = Number(response_branchCodeByLatLngSecond?.Data[0].DeliveryFeeLimit);
    LogInfo('fetchAndSetNearestStoreData method', `Nearest Selected Store Data: ${defaultStoreData}`);
    dispatch(storeActions.setStore(defaultStoreData));
  }
  return response_branchCodeByLatLng?.Data?.Title
});
