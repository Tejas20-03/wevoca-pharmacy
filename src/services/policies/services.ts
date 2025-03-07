import { AxiosGet } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { GetPrivacies_ResponseDataType } from './types';

const setErrorMessage = (message: string) => ({ title: 'Policies Service', message });

// API's
const Privacy_policy_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTaxonomyValue&Value=privacy-data`;
const Return_policy_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTaxonomyValue&Value=return-data`;
const Refund_policy_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTaxonomyValue&Value=refund`;
const Shipping_policy_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTaxonomyValue&Value=shipping-data`;
const Term_policy_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTaxonomyValue&Value=term-condition-data`;

// Methods
export const getPrivacyPolicy = (configData: configDataType) => AxiosGet<GetPrivacies_ResponseDataType>(Privacy_policy_api(), configData, setErrorMessage('getPrivacyPolicy method'));
export const getReturnPolicy = (configData: configDataType) => AxiosGet<GetPrivacies_ResponseDataType>(Return_policy_api(), configData, setErrorMessage('getReturnPolicy method'));
export const getRefundPolicy = (configData: configDataType) => AxiosGet<GetPrivacies_ResponseDataType>(Refund_policy_api(), configData, setErrorMessage('getReturnPolicy method'));
export const getShippingPolicy = (configData: configDataType) => AxiosGet<GetPrivacies_ResponseDataType>(Shipping_policy_api(), configData, setErrorMessage('getShippingPolicy method'));
export const getTermPolicy = (configData: configDataType) => AxiosGet<GetPrivacies_ResponseDataType>(Term_policy_api(), configData, setErrorMessage('getTermPolicy method'));
