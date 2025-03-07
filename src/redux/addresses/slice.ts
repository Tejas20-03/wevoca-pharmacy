import { createSlice } from '@reduxjs/toolkit';
import { setAddresses } from './reducer';

export const addressesSliceIntialState: AddressesSliceType = {
    selectedAddressID: null,
    selectedAddressDetails: null,
    addresses: [],
    province: '',
    city: '',
};

const addressesSlice = createSlice({
    name: 'addresses',
    initialState: addressesSliceIntialState,
    reducers: { setAddresses },
});

export default addressesSlice;
export const addressesActions = addressesSlice.actions;
export type AddressesSliceType = {
    selectedAddressID: number | string | null;
    selectedAddressDetails: SavedAddressDataType | null,
    addresses: SavedAddressDataType[],
    province?: string | null
    city?: string;
};
export type SavedAddressDataType = {
    id: number | string;         // local addressID
    addressID: number | string;  // backendAddressID
    lat: number;
    lng: number;
    city: string;
    area: string;
    customAddress: string;
    addressType: string;
    isAddressStoredInDB: boolean;
}
