import { PaymentType } from '@/services/checkout/types';

// CheckVoucher
export type CheckVoucher_ResponseType = {
  ResponseType: 1 | 0;
  Data: CheckVoucher_ResponseDataType[];
};
export type CheckVoucher_ResponseDataType = {
  ID: string;
  Name: string;
  VoucherCode: string;
  DiscountType: string;
  IsActive: string;
  Amount: string;
  CustomerVoucherCode: string;
  Platforms: string;
  IsOneTimeUse: string;
  IsSuperDiscount: string;
  VoucherApplyType: string;
  OrderMethods: string;
  PaymentMethods: string;
  ApplicableCategories: string;
  StartDateTime: string;
  EndDate: string;
  EndDateTime: string;
  ShowOnCCPanel: string;
  RedemptionLimit: string;
  EmployeeLevel: string;
  ValidateMOV: string;
  MOV: string;
  IsEmployeeVoucher: string;
  CapAmount: string;
  ApplicableProducts: string;
  ApplicableCategoriesName: string;
  isUsed: string;
};

// CheckVoucherNew
export type CheckVoucherNew_ArgsType = {
  branchCode: string;
  customerID: string;
  creditCardToken: string;
  voucherCode: string;
  orderSubtotal: string;
  orderTotal: string;
  paymentType: PaymentType;
  orderdata: {
    ItemID: string;
    Quantity: string;
    ProductName: string;
    CategoryName: string;
    Price: string;
    ItemImage: string;
  }[];
};
export type CheckVoucherNew_ResponseType = {
  ResponseType: string;
  isValid: boolean;
  message: string;
  voucherCode: string;
  voucherAmount: string;
  VoucherType?: string;
};
