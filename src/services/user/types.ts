// CustomerLoginToken
export type CustomerLoginToken_ArgsType = {
  UserName: string;
  Password: string;
};
export type CustomerLoginToken_ResponseType = {
  access_token: string;
  expires_in: number;
};

// CustomerLogin
export type CustomerLogin_ResponseType =
  | undefined
  | {
    responseType: '1' | '0';
    message: string,
    error: string,
    NewCustomer: string;
    CustomerID: string;
    CustomerToken: string;
  };

// CheckVerificationCode
export type CheckVerificationCode_ResponseType = {
  responseType: '1' | '0';
  Message: string;
  CustomerID: string;
  CustomerToken: string;
};

// GetCustomerInfo
export type GetCustomerInfo_ResponseType = {
  ResponseType: 1 | 0;
  Data: {
    ID: string;
    FirstName: string;
    LastName: string;
    Name: string;
    Mobile: string;
    Area: string;
    Address: string;
    Email: string;
    Gender: string;
    Source: string;
    Channel: string;
    Transactions: string;
    Orders: string;
    Reservations: string;
    Enquiry: string;
    FakeOrders: string;
    NoShows: string;
    MemberPoints: string;
    deviceToken: string;
    IsCustomerVerified: string;
    ConfirmedOrders: string;
    IsCreditCardVerified: string;
    VerificationCode: string;
    Created: string;
    Password: string;
    LoginDiscount: string;
    IsMobileDealNotAvailed: string;
    FBID: string;
    Currency: string;
    City: string;
    DOB: string;
  }[];
};

// CustomerAdditionalInfo
export type CustomerAdditionalInfo_ResponseType = {
  responseType: 1 | 0;
  message: string;
};
