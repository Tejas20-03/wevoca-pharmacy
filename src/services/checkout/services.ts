import { AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { BannerResponse, ProcessOrder_ArgsType, ProcessOrder_ResponseType } from './types';

const setErrorMessage = (message: string) => ({ title: 'Checkout Service', message });

// API's
const getCartBannerWeb_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetBannerforCheckout&CartType=CartWeb`;
const getCartBannerMobile_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetBannerforCheckout&CartType=CartMWeb`;
const ProcessOrder_api = (phoneNumber: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/ProcessOrderNew&Phone=${phoneNumber}`;
const uploadImage = () => `${BASE_URL_DVAGO_API}/AppAPIV3/UploadImage`;

// Methods
export const getCartBannerWeb = (configData: configDataType) => AxiosPost<BannerResponse>(getCartBannerWeb_api(), configData, setErrorMessage('postProcessOrder method'))
export const getCartBannerMobile = (configData: configDataType) => AxiosPost<BannerResponse>(getCartBannerMobile_api(), configData, setErrorMessage('postProcessOrder method'))
export const postProcessOrder = (phoneNumber: string, data: ProcessOrder_ArgsType, configData: configDataType) => AxiosPost<ProcessOrder_ResponseType>(ProcessOrder_api(phoneNumber), configData, setErrorMessage('postProcessOrder method'), data);
export const postUploadImage = (data, configData: configDataType) => AxiosPost<ProcessOrder_ResponseType>(uploadImage(), configData, setErrorMessage('postProcessOrder method'), data);
