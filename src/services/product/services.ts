import { AxiosGet, AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { AddViewUnavailableItem_ResponseType, GetMultipleProducts_ResponseType, GetProductBanners_ResponseType, GetProductBanners_TitleTypes, GetProductByAlphabet_ResponseType, GetProductByBrand_ResponseType, GetProductByCategory_ResponseType, GetProductDescriptionByID_ResponseType, GetProductDetailByID_ResponseType, productSuggestion_response } from './types';

const setErrorMessage = (message: string) => ({ title: 'Product Service', message });

// API's
const AddViewUnavailableItem_api = (customerID: string, storeCode: string | number | undefined, productID: string, productUPC: string, productName: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/AddViewUnavailableItem&CustomerID=${customerID}&BranchCode=${storeCode}&ProductID=${productID}&UPC=${productUPC}&ProdutName=${productName}`;
const GetProductDescriptionByID_api = (productID: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetProductDescriptionBySlugV1&ProductSlug=${productID}`;
const GetProductDetailByID_api = (productID: string, storeCode: string | number | undefined) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetProductDetailBySlugV2&ProductSlug=${productID}&BranchCode=${storeCode}`;
const GetMultipleProducts_api = (productIDs: string, storeCode: string | number | undefined) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetMultipleProductsV1&ProductID=${productIDs}&BranchCode=${storeCode}`;
const GetProductByCategory_api = (categoryURL: string, limit: [number, number], storeCode: string | number | undefined) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetProductByCategorySlugV2&CategorySlug=${categoryURL}&limit=${limit[0]},${limit[1]}&BranchCode=${storeCode}`;
const GetProductByBrand_api = (brandUrl: string, limit: [number, number], storeCode: string | number | undefined) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetProductByBrandSlug&BrandSlug=${brandUrl}&limit=${limit[0]},${limit[1]}&BranchCode=${storeCode}`;
const GetProductByAlphabet_api = (alphabet: string, limit: [number, number], storeCode: string | number | undefined) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetProductByAlphabetV1&Alphabet=${alphabet}&limit=${limit[0]},${limit[1]}&BranchCode=${storeCode}`;
const GetProductBanners_api = (title: GetProductBanners_TitleTypes | string, productIDs: string, storeCode: string | number | undefined) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetProductBannersBySlugV1&Slug=${title}&BranchCode=${storeCode || ''}&ProductID=${productIDs}`;
const GetProductSlug_api = (oldSlug: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetNewSlug&OldSlug=${oldSlug}`;
const GetProductSuggestion_api = (Usedfor: string | undefined, UPC: string, BranchCode: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetSuggestiveProductsV2&Usedfor=${Usedfor}&UPC=${UPC}&BranchCode=${BranchCode}`;

// Methods
export const postAddViewUnavailableItem = (customerID: string, storeCode: string | number | undefined, productID: string, productUPC: string, productName: string, configData: configDataType) => AxiosPost<AddViewUnavailableItem_ResponseType>(AddViewUnavailableItem_api(customerID, storeCode, productID, productUPC, productName), configData, setErrorMessage('postAddViewUnavailableItem method'));
export const getProductDescriptionByID = (productID: string, configData: configDataType) => AxiosGet<GetProductDescriptionByID_ResponseType>(GetProductDescriptionByID_api(productID), configData, setErrorMessage('getProductDescriptionByID method'));
export const getProductDetailByID = (productID: string, storeCode: string | number | undefined, configData: configDataType) => AxiosGet<GetProductDetailByID_ResponseType>(GetProductDetailByID_api(productID, storeCode), configData, setErrorMessage('getProductDetailByID method'));
export const getMultipleProducts = (productIDs: string, storeCode: string | number | undefined, configData: configDataType) => AxiosGet<GetMultipleProducts_ResponseType>(GetMultipleProducts_api(productIDs, storeCode), configData, setErrorMessage('getMultipleProducts method'));
export const getProductByCategory = (categoryURL: string, limit: [number, number], storeCode: string | number | undefined, configData: configDataType) => AxiosGet<GetProductByCategory_ResponseType>(GetProductByCategory_api(categoryURL, limit, storeCode), configData, setErrorMessage('getProductByCategory method'));
export const getProductByBrand = (brandUrl: string, limit: [number, number], storeCode: string | number | undefined, configData: configDataType) => AxiosGet<GetProductByBrand_ResponseType>(GetProductByBrand_api(brandUrl, limit, storeCode), configData, setErrorMessage('getProductByBrand method'));
export const getProductByAlphabet = (alphabet: string, limit: [number, number], storeCode: string | number | undefined, configData: configDataType) => AxiosGet<GetProductByAlphabet_ResponseType>(GetProductByAlphabet_api(alphabet, limit, storeCode), configData, setErrorMessage('getProductByAlphabet method'));
export const getProductBanners = (title: GetProductBanners_TitleTypes | string, storeCode: string | number | undefined, productIDs: string, configData: configDataType) => AxiosGet<GetProductBanners_ResponseType>(GetProductBanners_api(title, productIDs, storeCode), configData, setErrorMessage('getProductBanners method'));
export const GetProductSlug = (oldSlug: string, configData: configDataType) => AxiosGet<GetProductBanners_ResponseType>(GetProductSlug_api(oldSlug), configData, setErrorMessage('getProductBanners method'));
export const GetProductSuggestion = (Usedfor: string | undefined, UPC: string, BranchCode: string, configData: configDataType) => AxiosGet<productSuggestion_response>(GetProductSuggestion_api(Usedfor, UPC, BranchCode), configData, setErrorMessage('getProductBanners method'));
