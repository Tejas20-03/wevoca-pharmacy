import { AxiosGet } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { BrandListingData_Response } from './types';

const setErrorMessage = (message: string) => ({ title: 'Categories Service', message });

// API's
const GetBrands_Api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetBrands`;

// Methods
export const GetBrandsListing = (configData: configDataType) => AxiosGet<BrandListingData_Response>(GetBrands_Api(), configData, setErrorMessage('getBrandsListing method'));
