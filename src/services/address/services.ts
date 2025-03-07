import { AxiosGet, AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { AddAddress_ResponseType, DeleteAddress_ResponseType, GetAddress_ResponseType } from './types';

const setErrorMessage = (message: string) => ({ title: 'Address Service', message });

// API's
const GetAddress_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetAddress`;
const AddAddress_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/AddAddressV1`;
const DeleteAddress_api = (AddressID: number) => `${BASE_URL_DVAGO_API}/AppAPIV3/DeleteAddress/AddressID=${AddressID}`;

// Methods
export const getAddress = (configData: configDataType) => AxiosGet<GetAddress_ResponseType>(GetAddress_api(), configData, setErrorMessage('getAddress method'));
export const postAddAddress = (data: { Address: string; Latitude: string; Longitude: string; NearestLandmark: string; Type: string; City: string; Area: string }, configData: configDataType) => AxiosPost<AddAddress_ResponseType>(AddAddress_api(), configData, setErrorMessage('postAddAddress method'), data);
export const postDeleteAddress = (AddressID: number, configData: configDataType) => AxiosPost<DeleteAddress_ResponseType>(DeleteAddress_api(AddressID), configData, setErrorMessage('postDeleteAddress method'));
