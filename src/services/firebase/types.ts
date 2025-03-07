
// AddCustomerToken
export type AddCustomerToken_ArgsType = {
    CustomerID: string;
    Channel: 'ios' | 'android';
    Token: string;
};
export type AddCustomerToken_ResponseType = {
    responseType: 1 | '0';
    message: string;
};
