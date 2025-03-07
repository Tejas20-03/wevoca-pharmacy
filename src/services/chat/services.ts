import { AxiosGet } from '@/utils/api-methods';
import { BETA_URL_DVAGO_API, configDataType } from '@/services/config';
import { GetBotQuestion_api, GetChatHistoryDetail_api, GetChatHistoryList_api, GetChatMode_ApiData, GetInitialMessage_api_type } from './types';

const setErrorMessage = (message: string) => ({ title: 'Checkout Service', message });

// API's
const getInitialMessage_api = (userId: string) => `${BETA_URL_DVAGO_API}/AppAPIV3/GetInitialMessage?userid=${userId}`;
const getChatMode_api = () => `${BETA_URL_DVAGO_API}/AppAPIV3/GetChatMode`;
const getChatFaq_api = () => `${BETA_URL_DVAGO_API}/AppAPIV3/GetChatFaq`;
const getUserChat_api = (userId: string) => `${BETA_URL_DVAGO_API}/AppAPIV3/GetUserChats?userid=${userId}`;
const getUserChatMessage_api = (chatID: string) => `${BETA_URL_DVAGO_API}/AppAPIV3/GetChatMessages?ChatID=${chatID}`;

// Methods
export const GetInitialMessage = (configData: configDataType, userId: string) => AxiosGet<GetInitialMessage_api_type>(getInitialMessage_api(userId), configData, setErrorMessage('Chat method'))
export const GetChatMode = (configData: configDataType) => AxiosGet<GetChatMode_ApiData>(getChatMode_api(), configData, setErrorMessage('Chat method'))
export const GetChatFaq = (configData: configDataType) => AxiosGet<GetBotQuestion_api>(getChatFaq_api(), configData, setErrorMessage('Chat method'))
export const GetUserChat = (configData: configDataType, userId: string) => AxiosGet<GetChatHistoryList_api>(getUserChat_api(userId), configData, setErrorMessage('Chat method'))
export const GetUserChatMessage = (configData: configDataType, userId: string) => AxiosGet<GetChatHistoryDetail_api>(getUserChatMessage_api(userId), configData, setErrorMessage('Chat method'))
