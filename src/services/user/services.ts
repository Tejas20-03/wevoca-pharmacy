import { AxiosGet, AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { CheckVerificationCode_ResponseType, CustomerAdditionalInfo_ResponseType, CustomerLoginToken_ArgsType, CustomerLoginToken_ResponseType, CustomerLogin_ResponseType, GetCustomerInfo_ResponseType } from './types';

const setErrorMessage = (message: string) => ({ title: 'User Service', message });

// API's
const CustomerLoginToken_api = () => `${BASE_URL_DVAGO_API}/Login.aspx?platform=web`;
const CustomerLogin_api = (username: string, phoneNum: string, email: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/CustomerLogin&Number=${phoneNum}&Name=${username}&Email=${email}`;
const CheckVerificationCode_api = (username: string, phoneNum: string, otp: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/CheckVerificationCode&Number=${phoneNum}&Name=${username}&Code=${otp}`;
const GetCustomerInfo_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetCustomerInfo`;
const CustomerAdditionalInfo_api = (email: string, gender: string, birthday: string, customerID: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/CustomerAdditionalInfo&Email=${email}&Gender=${gender}&Birthday=${birthday}&CustomerID=${customerID}`;

// Methods
export const postCustomerLoginToken = (data: CustomerLoginToken_ArgsType, configData: configDataType) => AxiosPost<CustomerLoginToken_ResponseType>(CustomerLoginToken_api(), configData, setErrorMessage('postCustomerLoginToken method'), data);
export const postCustomerLogin = (username: string, phoneNum: string, email: string, configData: configDataType) => AxiosPost<CustomerLogin_ResponseType>(CustomerLogin_api(username, phoneNum, email), configData, setErrorMessage('postCustomerLogin method'));
export const postCheckVerificationCode = (username: string, phoneNum: string, otp: string, configData: configDataType) => AxiosPost<CheckVerificationCode_ResponseType>(CheckVerificationCode_api(username, phoneNum, otp), configData, setErrorMessage('postCheckVerificationCode method'));
export const getCustomerInfo = (configData: configDataType) => AxiosGet<GetCustomerInfo_ResponseType>(GetCustomerInfo_api(), configData, setErrorMessage('getCustomerInfo method'));
export const postCustomerAdditionalInfo = (email: string, gender: string, birthday: string, customerID: string, configData: configDataType) => AxiosPost<CustomerAdditionalInfo_ResponseType>(CustomerAdditionalInfo_api(email, gender, birthday, customerID), configData, setErrorMessage('postCustomerAdditionalInfo method'));
