import { AxiosGet, AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { DeleteCreditCard_ResponseType, GetCustomerCreditCard_ResponseType } from './types';

const setErrorMessage = (message: string) => ({ title: 'CreditCard Service', message });

// API's
const GetCustomerCreditCard_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetCustomerCreditCard`;
const DeleteCreditCard_api = (token: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/DeleteCreditCard&Token=${token}`;

// Methods
export const getCustomerCreditCard = (configData: configDataType) => AxiosGet<GetCustomerCreditCard_ResponseType>(GetCustomerCreditCard_api(), configData, setErrorMessage('getCustomerCreditCard method'));
export const getDeleteCreditCard = (token: string, configData: configDataType) => AxiosPost<DeleteCreditCard_ResponseType>(DeleteCreditCard_api(token), configData, setErrorMessage('getDeleteCreditCard method'));
