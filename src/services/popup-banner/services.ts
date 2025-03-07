import { AxiosGet } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { GetPopupBannerLog_Response, GetPopupBanner_ResponseDataType } from './types';

const setErrorMessage = (message: string) => ({ title: 'Banner Popup', message });

// API's
const PopupBanner = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetBannersNew&Title=PopUpBannerWebsite`;
const PopupBannerApp_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetBannersNew&Title=PopUpBannerMsite`;
const PopupBannerLog = () => `${BASE_URL_DVAGO_API}/AppAPIV3/AddAPICallLog/platform=Web&APIName=HomePageBanner`;

// Methods
export const getPopupBanner = (configData: configDataType) => AxiosGet<GetPopupBanner_ResponseDataType>(PopupBanner(), configData, setErrorMessage('Banner popup method'));
export const getPopupBannerApp = (configData: configDataType) => AxiosGet<GetPopupBanner_ResponseDataType>(PopupBannerApp_api(), configData, setErrorMessage('Banner popup app method'));
export const setPopupBannerLog = (configData: configDataType) => AxiosGet<GetPopupBannerLog_Response>(PopupBannerLog(), configData, setErrorMessage('Banner popup app method'));
