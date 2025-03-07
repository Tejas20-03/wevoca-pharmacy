import { AxiosGet } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { GetBannersNew_ResponseType, GetBannersNew_TitleType } from './types';

const setErrorMessage = (message: string) => ({ title: 'Banners Service', message });

// API's
const GetBannersNew_api = (title: GetBannersNew_TitleType, storeCode: string | number | null) => `${BASE_URL_DVAGO_API}/AppAPIV3/GetBannersNewWeb&Title=${title}&BranchCode=${storeCode}`;

// Methods
export const getBannersNew = (title: GetBannersNew_TitleType, storeCode: string | number | null, configData: configDataType) => AxiosGet<GetBannersNew_ResponseType>(GetBannersNew_api(title, storeCode), configData, setErrorMessage('getBannersNew method'));
