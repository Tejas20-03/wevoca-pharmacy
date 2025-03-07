import { PayloadAction } from '@reduxjs/toolkit';
import { AddressesSliceType } from './slice';

type stateType = AddressesSliceType;
type actionType = PayloadAction<Partial<AddressesSliceType>>;

export const setAddresses = (state: stateType, action: actionType) => {
  const { addresses, selectedAddressID, selectedAddressDetails, province, city } = action.payload;

  state.addresses = addresses !== undefined ? addresses : state.addresses;
  state.selectedAddressID = selectedAddressID !== undefined ? selectedAddressID : state.selectedAddressID;
  state.selectedAddressDetails = selectedAddressDetails !== undefined ? selectedAddressDetails : state.selectedAddressDetails;
  state.province = province !== undefined ? province : state.province;
  state.city = city !== undefined ? city : state.city;
};
