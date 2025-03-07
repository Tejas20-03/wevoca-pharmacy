import { AxiosGet } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { GetFaqs_About_ResponseDataType } from './types';

const setErrorMessage = (message: string) => ({ title: 'FAQS Data Service', message });

// API's
const Faqs_about_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTaxonomyValue&Value=about`;
const Faqs_Return_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTaxonomyValue&Value=return-faqs-data`;
const Faqs_Orders_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTaxonomyValue&Value=order-faqs-data`;
const Faqs_Payment_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTaxonomyValue&Value=payment-data`;
const Faqs_Deleivery_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTaxonomyValue&Value=delivery-details`;
const Faqs_Medicines_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTaxonomyValue&Value=medicines-data`;

// Methods
export const getFaqsAbout = (configData: configDataType) => AxiosGet<GetFaqs_About_ResponseDataType>(Faqs_about_api(), configData, setErrorMessage('getFaqsAbout method'));
export const getFaqsReturn = (configData: configDataType) => AxiosGet<GetFaqs_About_ResponseDataType>(Faqs_Return_api(), configData, setErrorMessage('getFaqsReturn method'));
export const getFaqsOrder = (configData: configDataType) => AxiosGet<GetFaqs_About_ResponseDataType>(Faqs_Orders_api(), configData, setErrorMessage('getFaqsOrder method'));
export const getFaqsPayment = (configData: configDataType) => AxiosGet<GetFaqs_About_ResponseDataType>(Faqs_Payment_api(), configData, setErrorMessage('getFaqsPayment method'));
export const getFaqsDeleivery = (configData: configDataType) => AxiosGet<GetFaqs_About_ResponseDataType>(Faqs_Deleivery_api(), configData, setErrorMessage('getFaqsDeleivery method'));
export const getFaqsMedicines = (configData: configDataType) => AxiosGet<GetFaqs_About_ResponseDataType>(Faqs_Medicines_api(), configData, setErrorMessage('getFaqsMedicines method'));
