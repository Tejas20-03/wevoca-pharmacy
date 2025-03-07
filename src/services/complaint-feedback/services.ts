import { AxiosGet, AxiosPost } from '@/utils/api-methods';
import { BASE_URL_DVAGO_API, configDataType } from '@/services/config';
import { AddComplaint_ResponseType, AddFeedback_ResponseType, GetComplaintType_ResponseType } from './types';

const setErrorMessage = (message: string) => ({ title: 'Complaint Service', message });

// API's
const GetComplaintType_api = () => `${BASE_URL_DVAGO_API}/AppAPIV3/GetComplaintType`;
const AddComplaint_api = (name: string, phoneNumber: string, storeCode: string, complaintType: string, complaint: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/AddComplaint&Name=${name}&Number=${phoneNumber}&BranchCode=${storeCode}&Type=${complaintType}&Complaint=${complaint}`;
const AddFeedback_api = (name: string, phoneNumber: string, feedback: string) => `${BASE_URL_DVAGO_API}/AppAPIV3/AddFeedback&Name=${name}&Phone=${phoneNumber}&Feedback=${feedback}`;

// Methods
export const getComplaintType = (configData: configDataType) => AxiosGet<GetComplaintType_ResponseType>(GetComplaintType_api(), configData, setErrorMessage('getComplaintType method'));
export const postAddComplaint = (name: string, phoneNumber: string, storeCode: string, complaintType: string, complaint: string, configData: configDataType) => AxiosPost<AddComplaint_ResponseType>(AddComplaint_api(name, phoneNumber, storeCode, complaintType, complaint), configData, setErrorMessage('postAddComplaint method'));
export const postAddFeedback = (name: string, phoneNumber: string, feedback: string, configData: configDataType) => AxiosPost<AddFeedback_ResponseType>(AddFeedback_api(name, phoneNumber, feedback), configData, setErrorMessage('postAddFeedback method'));
