import { AxiosGet } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';

const setErrorMessage = (message: string) => ({ title: 'Ticker Service', message });

// API's
const GetTicker_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetTaxonomyValue&Value=StripeBanner`;

// Methods
export const getTicker = (configData: configDataType) => AxiosGet<string>(GetTicker_api(), configData, setErrorMessage('getTicker method'));
