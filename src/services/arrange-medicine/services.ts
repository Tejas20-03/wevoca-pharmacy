import { AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { AddArrangeMedicineInquiry_ResponseType } from './types';
import { addInquiryObjType } from '@/services/prescription/types';

const setErrorMessage = (message: string) => ({ title: 'Arrange Medicine Service', message });

// API's
const AddArrangeMedicineInquiry_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/AddInquiryV1`;

// Methods
export const postAddArrangeMedicineInquiry = (data: addInquiryObjType, configData: configDataType) => AxiosPost<AddArrangeMedicineInquiry_ResponseType>(AddArrangeMedicineInquiry_api(), configData, setErrorMessage('postAddArrangeMedicineInquiry method'), data);
