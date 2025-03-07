import { AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { GetFcmTokenApi_Response } from './types';

const setErrorMessage = (message: string) => ({ title: 'fcm token Service', message });

// API's
const Fcm_Token_Api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/AddCustomerTokenWeb`;

// Methods
export const SaveFcmTokenApi = (data: GetFcmTokenApi_Response, configData: configDataType) => AxiosPost(Fcm_Token_Api(), configData, setErrorMessage('getFcmTokenApi Error method'), data);
