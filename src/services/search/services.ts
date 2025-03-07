import { AxiosGet, AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { SearchProductByJSON_ArgsType, SearchProductByJSON_ResponseType, SearchText_ResponseType, Trending_ResponseType } from './types';

const setErrorMessage = (message: string) => ({ title: 'Search Service', message });

// API's
const SearchText_api = (productName: string, limit: [number, number], storeCode: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/SearchText&ProductName=${productName}&limit=${limit[0]},${limit[1]}&BranchCode=${storeCode}`;
const SearchProductByJSON_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/SearchProductByJSONV1`;
const Trending_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTrending`;

// Methods
export const getSearchText = (productName: string, storeCode: string, configData: configDataType) => AxiosGet<SearchText_ResponseType>(SearchText_api(productName, [0, 20], storeCode), configData, setErrorMessage('getSearchText method'));
export const postSearchProductByJSON = (data: SearchProductByJSON_ArgsType, configData: configDataType) => AxiosPost<SearchProductByJSON_ResponseType>(SearchProductByJSON_api(), configData, setErrorMessage('postSearchProductByJSON method'), data);
export const getTrending = (configData: configDataType) => AxiosGet<Trending_ResponseType>(Trending_api(), configData, setErrorMessage('getTrending method'));
