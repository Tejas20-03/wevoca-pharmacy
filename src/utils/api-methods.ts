import axios from 'axios';
import { configDataType, REQUEST_CONFIG } from '@/services/config';
import { LogError } from './dev-logging';

export const AxiosPost = async <T>(url: string, config: configDataType, errorHandling: { title: string; message: string }, data?: object) => {
  try {
    let bodyData: string | FormData | undefined;
    if (data) bodyData = config.contentType === 'multipart/form-data' ? ConvertObjectToFormData(data) : ConvertObjectToJson(data);
    const response = await axios.post(url, bodyData, REQUEST_CONFIG(config));
    return response.data as T;
  } catch (error) {
    LogError(errorHandling.title, errorHandling.message, error);
  }
};

export const AxiosGet = async <T>(url: string, config: configDataType, errorHandling: { title: string; message: string }) => {
  try {
    const response = await axios.get(url, REQUEST_CONFIG(config));
    return response.data as T;
  } catch (error) {
    LogError(errorHandling.title, errorHandling.message, error);
  }
};

export const ConvertObjectToJson = (data: object) => JSON.stringify(data);
export const ConvertJsonToObject = <T>(data: string) => JSON.parse(data) as T;
const ConvertObjectToFormData = (data: object) => {
  const formData = new FormData();
  // Append each key-value pair to the FormData
  Object.entries(data).forEach(([key, value]) => {
    // Check if the value is a File object
    if (value instanceof File) {
      formData.append(key, value); // Append only the file data
    } else {
      formData.append(key, value); // For other data types, append as usual
    }
  });
  return formData;
};
