// ProcessOrder
export enum PaymentType {
  COD = 'Cash On Delivery',
  ONLINE = 'CreditCard',
}
export type ProcessOrder_ArgsType = {
  platform: string;
  phone: string;
  fullname: string;
  lat: string;
  lng: string;
  cityname: string;
  customeraddress: string;
  orderamount: number;
  deliverycharges: number;
  PlatformFees?: number;
  discountamount: number;
  totalamount: number;
  paymenttype: string;
  token: string;
  IsPrescriptionRequired: boolean;
  PrescriptionURL: string;
  Remarks: string;
  tax: string;
  taxamount: string;
  deliverytime: string;
  ordertype: 'Delivery';
  BranchCode: string;
  VoucherCode: string;
  VoucherAmount: number;
  client_id?: string;
  orderdata: {
    ItemID: string;
    Quantity: string;
    ProductName: string;
    ItemImage: string;
    CategoryName: string;
    Price: string;
  }[];
};
export type ProcessOrder_ResponseType = {
  responseType: 1 | 0;
  OrderID: string;
  DeliveryTime: string;
  OrderAmount: string;
  message: string;
  URL: string;
};


export type BannerResponse = {
  ResponseType: 1 | 0;
  Data: BannerResponseData[]
}

export type BannerResponseData = {
  ImageURL: string;
}