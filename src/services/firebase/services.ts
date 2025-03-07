import { AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { AddCustomerToken_ArgsType, AddCustomerToken_ResponseType } from './types';

const setErrorMessage = (message: string) => ({ title: 'Firebase Service', message });

// API's
const AddCustomerToken_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/AddCustomerToken`;

// Methods
export const postAddCustomerToken = (data: AddCustomerToken_ArgsType, configData: configDataType) => AxiosPost<AddCustomerToken_ResponseType>(AddCustomerToken_api(), configData, setErrorMessage('postAddCustomerToken method'), data);