import { AxiosGet, AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { CartMessageData_Response, cartData_Response } from './types';

const setErrorMessage = (message: string) => ({ title: 'Categories Service', message });

// API's
const getCartInDB = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetCustomerCart`;
const addCartInDB = (branchcode: string, platform: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/AddCustomerCart/BranchCode=${branchcode}&Platform=${platform}`;

// Methods
export const GetAddCartInDB = (configData: configDataType) => AxiosGet<CartMessageData_Response>(getCartInDB(), configData, setErrorMessage('postAddFeedback method'));
export const PostAddCartInDB = (branchcode: string, platform: string, data: cartData_Response, configData: configDataType) => AxiosPost<CartMessageData_Response>(addCartInDB(branchcode, platform), configData, setErrorMessage('postAddFeedback method'), data);
