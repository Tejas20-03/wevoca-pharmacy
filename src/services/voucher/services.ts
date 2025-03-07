import { AxiosGet, AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { CheckVoucherNew_ArgsType, CheckVoucherNew_ResponseType, CheckVoucher_ResponseType } from './types';

const setErrorMessage = (message: string) => ({ title: 'Voucher Service', message });

// API's

const CheckVoucher_api = (voucherType: string, customerID: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetVoucher&Type=${voucherType}&CustomerID=${customerID}`;
const CheckVoucherNew_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/CheckVoucherNew`;
const GetVoucher_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetCustomerVouchers`;

// Methods
export const getCheckVoucher = (voucherType: string, customerID: string, configData: configDataType) => AxiosGet<CheckVoucher_ResponseType>(CheckVoucher_api(voucherType, customerID), configData, setErrorMessage('getCheckVoucher method'));
export const postCheckVoucherNew = (data: CheckVoucherNew_ArgsType, configData: configDataType) => AxiosPost<CheckVoucherNew_ResponseType>(CheckVoucherNew_api(), configData, setErrorMessage('postCheckVoucherNew method'), data);
export const getCustomerVouchers = (configData: configDataType) => AxiosGet<CheckVoucher_ResponseType>(GetVoucher_api(), configData, setErrorMessage('getCheckVoucher method'));
