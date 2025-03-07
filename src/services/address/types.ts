
// GetCities
export type GetCities_ResponseType = {
    ResponseType: 1 | '0';
    Data: {
        ID: string;
        Name: string;
    }[];
};

// GetAreas
export type GetAreas_ResponseType = {
    responseType: 1 | '0';
    Data: {
        ID: string;
        Name: string;
    }[];
};

// GetAddress
export type GetAddress_ResponseType = {
    ResponseType: 1 | '0';
    Data: GetAddress_ResponseData[];
};
export type GetAddress_ResponseData = {
    ID: string;
    id?: string | undefined;
    CustomerID: string;
    Address: string;
    Latitude: string;
    Longitude: string;
    Location: string;
    NearestLandmark: string;
    Created: string;
    City: string;
    Area: string;
    Type: string;
    customAddress?: string | undefined;
    addressType?: string | undefined;
    addressID?: string | undefined
};

// AddAddress
export type AddAddress_ResponseType = {
    ResponseType: 1 | 0;
    message: string;
    AddressID: string;
};

// DeleteAddress
export type DeleteAddress_ResponseType = {
    responseType: 0;
    ResponseType: 1;
    message: string;
};
