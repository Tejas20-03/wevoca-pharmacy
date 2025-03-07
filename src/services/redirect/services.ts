import { AxiosGet } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { GetCategorySlugRedirect } from './types';

const setErrorMessage = (message: string) => ({ title: 'Product Service', message });

// API's
const GetCategorySlug_API = (oldSlug: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/CheckTypeBySlug&OldSlug=${oldSlug}`;

// Methods
export const getCategorySlug = (oldSlug: string, configData: configDataType) => AxiosGet<GetCategorySlugRedirect>(GetCategorySlug_API(oldSlug), configData, setErrorMessage('getCategorySlug method'));
