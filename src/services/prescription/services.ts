import { AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { AddPrescriptionInquiry_ResponseType, UpdatePrescription_ResponseType, addInquiryObjType } from '@/services/prescription/types';

const setErrorMessage = (message: string) => ({ title: 'Prescription Service', message });

// API's
const AddPrescriptionInquiry_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/AddInquiryV1`;
const UpdatePrescription_api = (orderID: string, prescriptionUrl: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/UpdatePrescription&OrderID=${orderID}&PrescriptionURL=${prescriptionUrl}`;

// Methods
export const postAddPrescriptionInquiry = (data: addInquiryObjType, configData: configDataType) => AxiosPost<AddPrescriptionInquiry_ResponseType>(AddPrescriptionInquiry_api(), configData, setErrorMessage('postAddPrescriptionInquiry method'), data);
export const postUpdatePrescription = (orderID: string, prescriptionURL: string, configData: configDataType) => AxiosPost<UpdatePrescription_ResponseType>(UpdatePrescription_api(orderID, prescriptionURL), configData, setErrorMessage('postUpdatePrescription method'));
