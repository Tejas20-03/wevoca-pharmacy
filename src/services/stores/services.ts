import { AxiosGet } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, BASE_URL_WEB_REQUEST_API, configDataType } from '@/services/config';
import { GetBranchCodeByLatLngSecond_ResponseType, GetBranchCodeByLatLng_ResponseType, GetBranchSchedule_ResponseType, GetBranch_ResponseType } from './types';

const setErrorMessage = (message: string) => ({ title: 'Store Service', message });

// API's
const GetBranch_api = (storeCode: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetBranch&BranchCode=${storeCode}`;
const GetBranchSchedule_api = (storeCode: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetBranchSchedule&BranchCode=${storeCode}`;
const GetBranchCodeByLatLng_api = (latitude: number, longitude: number) => `${BASE_URL_WEB_REQUEST_API}/GetBranchCodeByLatLng?lat=${latitude}&lng=${longitude}`;
const GetBranchCodeByLatLngSecond_api = (province: string | null) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetBranchByProvience&province=${province}`;

// Methods
export const getBranch = (storeCode: string, configData: configDataType) => AxiosGet<GetBranch_ResponseType>(GetBranch_api(storeCode), configData, setErrorMessage('getBranch method'));
export const getBranchSchedule = (storeCode: string, configData: configDataType) => AxiosGet<GetBranchSchedule_ResponseType>(GetBranchSchedule_api(storeCode), configData, setErrorMessage('getBranchSchedule method'));
export const getBranchCodeByLatLng = (latitude: number, longitude: number, configData: configDataType) => AxiosGet<GetBranchCodeByLatLng_ResponseType>(GetBranchCodeByLatLng_api(latitude, longitude), configData, setErrorMessage('getBranchCodeByLatLng method'));
export const getBranchCodeByLatLngSecond = (province: string | null, configData: configDataType) => AxiosGet<GetBranchCodeByLatLngSecond_ResponseType>(GetBranchCodeByLatLngSecond_api(province), configData, setErrorMessage('getBranchCodeByLatLng method'));
