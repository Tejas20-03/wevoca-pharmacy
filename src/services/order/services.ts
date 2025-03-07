import { AxiosGet, AxiosPost } from '@/utils/api-methods';
import {  BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { CancelOrder_ResponseType, CheckOrderStatus_ResponseType, GetCancelReason_ResponseType, GetOrderDetail_ResponseType, MyOrders_ResponseType, MyPendingOrders_ResponseType, RateOrder_ResponseType } from './types';

const setErrorMessage = (message: string) => ({ title: 'Order Service', message });

// API's
const MyOrders_api = (limit: [number, number]) => `${BASE_URL_DVAGO_API}/AppAPIV3/MyOrders&limit=${limit[0]},${limit[1]}`;
const MyPendingOrders_api = (limit: [number, number]) => `${BASE_URL_DVAGO_API}/AppAPIV3/MyPendingOrders&limit=${limit[0]},${limit[1]}`;
const MyCompleteOrders_api = (limit: [number, number]) => `${BASE_URL_DVAGO_API}/AppAPIV3/MyCompletedOrders&limit=${limit[0]},${limit[1]}`;
const MyCancelledOrders_api = (limit: [number, number]) => `${BASE_URL_DVAGO_API}/AppAPIV3/MyCancelledOrders&limit=${limit[0]},${limit[1]}`;
const GetOrderDetail_api = (orderID: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetOrderDetail&OrderID=${orderID}`;
const CheckOrderStatus_api = (orderID: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/CheckOrderStatus&OrderID=${orderID}`;
const GetCancelReason_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetCancelReason`;
const CancelOrder_api = (orderID: string, cancelReason: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/CancelOrder&OrderID=${orderID}&CancelReason=${cancelReason}`;
const RateOrder_api = (orderID: string, rating: string, review: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/RateOrder&OrderID=${orderID}&Rate=${rating}&Reviews=${review}`;
const PlatformFees_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTaxonomyValue&Value=platformfees`;

// Methods
export const getMyOrders = (limit: [number, number], configData: configDataType) => AxiosGet<MyOrders_ResponseType>(MyOrders_api(limit), configData, setErrorMessage('getMyOrders method'));
export const getMyPendingOrders = (limit: [number, number], configData: configDataType) => AxiosGet<MyPendingOrders_ResponseType>(MyPendingOrders_api(limit), configData, setErrorMessage('getMyPendingOrders method'));
export const getMyCompleteOrders = (limit: [number, number], configData: configDataType) => AxiosGet<MyOrders_ResponseType>(MyCompleteOrders_api(limit), configData, setErrorMessage('getMyPendingOrders method'));
export const getMyCancelledOrders = (limit: [number, number], configData: configDataType) => AxiosGet<MyOrders_ResponseType>(MyCancelledOrders_api(limit), configData, setErrorMessage('getMyPendingOrders method'));
export const getOrderDetail = (orderID: string | string[] | undefined, configData: configDataType) => AxiosGet<GetOrderDetail_ResponseType>(GetOrderDetail_api(orderID), configData, setErrorMessage('getOrderDetail method'));
export const getCheckOrderStatus = (orderID: string, configData: configDataType) => AxiosGet<CheckOrderStatus_ResponseType>(CheckOrderStatus_api(orderID), configData, setErrorMessage('getCheckOrderStatus method'));
export const getCancelReason = (configData: configDataType) => AxiosGet<GetCancelReason_ResponseType>(GetCancelReason_api(), configData, setErrorMessage('getCancelReason method'));
export const postCancelOrder = (orderID: string, cancelReason: string, configData: configDataType) => AxiosPost<CancelOrder_ResponseType>(CancelOrder_api(orderID, cancelReason), configData, setErrorMessage('postCancelOrder method'));
export const postRateOrder = (orderID: string, rating: string, review: string, configData: configDataType) => AxiosPost<RateOrder_ResponseType>(RateOrder_api(orderID, rating, review), configData, setErrorMessage('postRateOrder method'));
export const PlatformFeesAPI = (configData: configDataType) => AxiosPost<number>(PlatformFees_api(), configData, setErrorMessage('Platform Fees method'));
