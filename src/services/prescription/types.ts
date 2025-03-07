
// AddPrescriptionInquiry
export type AddPrescriptionInquiry_ResponseType = {
    responseType: 1 | 0;
    message: string;
};

// UpdatePrescription
export type UpdatePrescription_ResponseType = undefined;



export type addInquiryObjType = {
    BranchCode: string,
    ProductID: string,
    Type: string,
    PrescriptionURL: string
  }