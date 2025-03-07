import { AxiosGet, AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { AddViewUnavailableItem_ResponseType, FetchReviewsData_Response } from './types';

const setErrorMessage = (message: string) => ({ title: 'Product Service', message });

// API's
const Get_Product_Review = (productId: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetReviews?ProductID=${productId}`;
const Post_Product_Review = () => `${BASE_URL_DVAGO_API}/AppAPIV3/AddReview`;

// Methods
export const GetProductReview = (productId: string, configData: configDataType) => AxiosGet<FetchReviewsData_Response>(Get_Product_Review(productId), configData, setErrorMessage('Product Review method'));
export const PostProductReview = (data: { Platform: string; ProductID: string; Rating: number; Reviews: string; OrderID: string; OrderDetailID: string }, configData: configDataType) => AxiosPost<AddViewUnavailableItem_ResponseType>(Post_Product_Review(), configData, setErrorMessage('Product Review method'), data);
