import { AxiosGet } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { GetCategoryMenu_ResponseType, GetChildCategory_ResponseType } from './types';

const setErrorMessage = (message: string) => ({ title: 'Categories Service', message });

// API's
const GetChildCategory_api = (categoryID: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetChildCategoryBySlug&CategorySlug=${categoryID}`;
const GetMenuCategory_api = (categoryName: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetMenuHierarchi/CategoryName=${categoryName}`;

// Methods
export const getChildCategory = (categoryID: string, configData: configDataType) => AxiosGet<GetChildCategory_ResponseType>(GetChildCategory_api(categoryID), configData, setErrorMessage('getChildCategory method'));
export const GetCategoryMenu = (categoryName: string, configData: configDataType) => AxiosGet<GetCategoryMenu_ResponseType>(GetMenuCategory_api(categoryName), configData, setErrorMessage('getMenuApi method'));
