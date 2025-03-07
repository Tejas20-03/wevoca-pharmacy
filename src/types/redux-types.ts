
/* eslint-disable no-restricted-imports */

import store from "../redux/store";
import { CreditCardApiDataType, GetMultipleProductsDataType, ProductBannersDetailType } from "./api-types";
export declare type AppDispatch = typeof store.dispatch;

export declare type UserDataType = {
    userID: string,
    userName: string,
    phoneNum: string,
}

export declare type PrescriptionDataType = {
    selectedPrescriptionUrl: string,
    selectedPrescriptionData: string | undefined,
}

export declare type LocationDataType = {
    selectedGeocode: selectedGeocodeType;
    selectedAddress: string,
    permissionDenied?: boolean | null
}
export declare type selectedGeocodeType = {
    latitude: number,
    longitude: number
}

export declare type CreditCardDataType = {
    selectedCreditCard: undefined | CreditCardApiDataType;
}

export declare type CartDataType = {
    totalUniqueCartItems: number;
    uniqueCartItems: number[],
    uniqueCartItemsDetails: CartItemsDetailsType[];

    subTotal: number;
    deliveryCharges: number;
    deliveryChargesLimit: number;
    deliveryChargesWaiveLimit: number;
    discount: number;
    total: number;

    appliedCoupon: string;
}
export declare type CartItemsDetailsType = {
    productID: string,
    productQuantity: number,
    productInfo: GetMultipleProductsDataType | ProductBannersDetailType,
};

export declare type BranchDataType = {
    expectedDeliveryTime: string,
    branchCode: string,
    branchID: string,
}

export declare type AddressesDataType = {
    savedAddresses: SelectedAddressDataType[],
    selectedAddress: SelectedAddressDataType;
    selectedAddressID: number,
}
export declare type SelectedAddressDataType = {
    id?: number,
    lat?: string,
    lng?: string,
    city?: string,
    area?: string,
    customAddress?: string,
    addressType?: string,
}

