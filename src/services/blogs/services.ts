import { AxiosGet } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { blogDetailData_Response, blogListingData_Response } from './types';

const setErrorMessage = (message: string) => ({ title: 'Categories Service', message });

// API's
const GetBlogListing_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/BlogListing`;
const GetBlogDetail_api = (slug: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetBlogBySlug&BlogSlug=${slug}`;
const GetBlogSearchApi = (search: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/BlogListing&Search=${search}`;

// Methods
export const GetBlogListing = (configData: configDataType) => AxiosGet<blogListingData_Response>(GetBlogListing_api(), configData, setErrorMessage('getChildCategory method'));
export const GetBlogDetail = (slug: string, configData: configDataType) => AxiosGet<blogDetailData_Response>(GetBlogDetail_api(slug), configData, setErrorMessage('getChildCategory method'));
export const GetBlogSearch = (search: string, configData: configDataType) => AxiosGet<blogListingData_Response>(GetBlogSearchApi(search), configData, setErrorMessage('getChildCategory method'));
