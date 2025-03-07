import { LocalStorageKeys } from '@/data/local-storage-keys';
import { LocalStorage } from '@/features/local-storage/local-storage';

import { cartSliceIntialState, CartSliceType } from '@/redux/cart/slice';
import { userSliceIntialState, UserSliceType } from '@/redux/user/slice';
import { ConvertJsonToObject, ConvertObjectToJson } from '@/utils/api-methods';
import { LogError } from '@/utils/dev-logging';

const GetFromLocalStorage = async <T>(key: string, defaultVal: string, type: 'isObject' | 'isString'): Promise<T> => {
  const response = await LocalStorage.getItem(key, defaultVal);

  if (response.data === null) LogError('GetFromLocalStorage method', `Error occured while getting item whose key is ${key}`, response.error);
  if (response.data !== null) return type === 'isObject' ? ConvertJsonToObject<T>(response.data) : (response.data as T);

  return ConvertJsonToObject<T>(defaultVal) as T;
};

// USER related LocalStorage Methods
export const SetUserInLocalStorage = async (userData: UserSliceType) => await LocalStorage.setItem(LocalStorageKeys.USER, ConvertObjectToJson(userData), 400);
export const GetUserFromLocalStorage = async (): Promise<UserSliceType> => await GetFromLocalStorage<UserSliceType>(LocalStorageKeys.USER, ConvertObjectToJson(userSliceIntialState), 'isObject');

export const SetSavedProvinceInLocalStorage = async (province: string) => await localStorage.setItem(LocalStorageKeys.SAVED_PROVINCE, province);
export const GetSavedProvinceInLocalStorage = () => localStorage.getItem(LocalStorageKeys.SAVED_PROVINCE);

// CART related LocalStorage Methods
export const SetCartInLocalStorage = async (cartData: CartSliceType) => await LocalStorage.setItem(LocalStorageKeys.CART, ConvertObjectToJson({ ...cartData, createdAt: new Date() }));
export const GetCartFromLocalStorage = async (): Promise<CartSliceType> => await GetFromLocalStorage<CartSliceType>(LocalStorageKeys.CART, ConvertObjectToJson(cartSliceIntialState), 'isObject');

// AUTH TOKEN related LocalStorage Methods
export const SetCustomerTokenInLocalStorage = (authToken: string) => localStorage.setItem(LocalStorageKeys.USER_TOKEN, authToken);
export const GetCustomerTokenInLocalStorage = () => localStorage.getItem(LocalStorageKeys.USER_TOKEN);
export const DeleteCustomerTokenInLocalstorage = () => localStorage.removeItem(LocalStorageKeys.USER_TOKEN);

export const GetCustomerTokenInCookiesStorage = async (): Promise<string> => await GetFromLocalStorage<string>(LocalStorageKeys.USER_TOKEN, '', 'isString');

export const GetFcmTokenFromLocalStorage = () => localStorage.getItem(LocalStorageKeys.FCM_TOKEN);
export const SetFcmTokenInLocalstorage = (fcmToken: string) => localStorage.setItem(LocalStorageKeys.FCM_TOKEN, fcmToken);

export const GetSelectedPaymentMethodInLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LocalStorageKeys.PAYMENT_METHOD);
  }
  return null;
};
export const SetSelectedPaymentMethodInLocalStorage = (paymentMethod: string) => localStorage.setItem(LocalStorageKeys.PAYMENT_METHOD, paymentMethod);

export const GetAppliedVoucherInLocalStorage = () => {
  if (typeof window !== 'undefined') localStorage.getItem(LocalStorageKeys.APPLIED_VOUCHER);
  return null;
};
export const SetAppliedVoucherInLocalStorage = (voucherValue: string) => {
  localStorage.setItem(LocalStorageKeys.APPLIED_VOUCHER, voucherValue);
};
export const DeleteAppliedVoucherInLocalStorage = () => localStorage.removeItem(LocalStorageKeys.APPLIED_VOUCHER);

// export const GetVoucherValue = () => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('error');
//   }
//   return null;
// };
// export const SetVoucherValue = (voucherValue: string) => localStorage.setItem('error', voucherValue);
// export const DeleteVoucherValue = () => localStorage.removeItem('error');
