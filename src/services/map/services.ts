import { AxiosGet } from '@/utils/api-methods';
import { BASE_URL_GOOGLE_MAPS, configDataType } from '@/services/config';
import { GetGoogleMapsLocationByLatLng_ResponseType } from './types';

const setErrorMessage = (message: string) => ({ title: 'Map Service', message });

// API's
const GetGoogleMapsLocationByLatLng_api = (latitude: number, longitude: number) => `${BASE_URL_GOOGLE_MAPS}/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`;

// Methods
export const getGoogleMapsLocationByLatLng = (latitude: number, longitude: number, configData: configDataType) => AxiosGet<GetGoogleMapsLocationByLatLng_ResponseType>(GetGoogleMapsLocationByLatLng_api(latitude, longitude), configData, setErrorMessage('getGoogleMapsLocationByLatLng method'));
