// GetCustomerCreditCard
export type GetCustomerCreditCard_ResponseType = {
  ResponseType: 1 | '0';
  Data: CreditCardApiDataType[];
};
export type CreditCardApiDataType = {
  ID: string;
  CustomerID: string;
  Name: string;
  CardNumber: string;
  CVC: string;
  Expiry: string;
  Token: string;
  Created: string;
};

export type DeleteCreditCard_ResponseType = {
  responseType: number;
  message: string;
};
