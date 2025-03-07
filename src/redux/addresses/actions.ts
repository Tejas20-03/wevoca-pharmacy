import { createAsyncThunk } from '@reduxjs/toolkit';

import { GetCustomerTokenInCookiesStorage, GetCustomerTokenInLocalStorage } from '@/functions/local-storage-methods';
import { getAddress, postAddAddress, postDeleteAddress } from '@/services/address/';
import { addressesActions, addressesSliceIntialState, AddressesSliceType, SavedAddressDataType } from './slice';
import { deepClone } from '@/utils/lodash-methods';
import { AsyncThunkConfig } from '@/redux/store';
import { emptyCart } from '@/redux/cart/actions';

import { fetchAndSetNearestStoreData } from '@/redux/store/actions';
import { storeActions, storeSliceIntialState } from '@/redux/store/slice';
import { Slide, toast } from 'react-toastify';
import mixpanel from 'mixpanel-browser';

const AddressesThunks = {
  SetAddressesDataFromLocalStorage: 'addresses/setAddressesDataFromLocalStorage',
  ResetAddressesToDefault: 'addresses/resetAddressesToDefault',
  SetAddressesAfterUserLogin: 'addresses/setAddressesAfterUserLogin',
  SaveAddress: 'addresses/saveAddress',
  DeleteAddress: 'addresses/deleteAddress',
  UpdateAddress: 'addresses/updateAddress',
  SelectAddress: 'addresses/selectAddress',
};
export const resetAddressesToDefault = createAsyncThunk<void, {}, AsyncThunkConfig>(AddressesThunks.ResetAddressesToDefault, async ({}, { dispatch }) => {
  dispatch(addressesActions.setAddresses(addressesSliceIntialState));
});

export const SelectAddress = createAsyncThunk<void, { addressID: number }, AsyncThunkConfig>(AddressesThunks.SelectAddress, async ({ addressID }, { dispatch, getState }) => {
  const addressesData = getState().addresses;
  const newlySelectedAddressData = addressesData.addresses.find((item) => item.addressID === addressID);
  if (newlySelectedAddressData) {
    dispatch(fetchAndSetNearestStoreData({ latitude: newlySelectedAddressData.lat, longitude: newlySelectedAddressData.lng }));
    dispatch(addressesActions.setAddresses({ selectedAddressID: newlySelectedAddressData.addressID, selectedAddressDetails: newlySelectedAddressData }));
  }
});

export const setAddressesAfterUserLogin = createAsyncThunk<void, {}, AsyncThunkConfig>(AddressesThunks.SetAddressesAfterUserLogin, async ({}, { dispatch }) => {
  let fetchedAddresses: SavedAddressDataType[] = [];
  const selectedAddressIDFromStorage = localStorage.getItem('selectedAddressID');
  const customerToken = GetCustomerTokenInLocalStorage();
  const customerTokenCookies: string = await GetCustomerTokenInCookiesStorage();
  const response = await getAddress({ token: customerToken || customerTokenCookies ? customerToken || customerTokenCookies : undefined });
  if (response && Number(response.ResponseType) === 1) {
    fetchedAddresses = response.Data.map<SavedAddressDataType>((item, index) => ({
      id: index,
      addressID: Number(item.ID),
      lat: Number(item.Latitude),
      lng: Number(item.Longitude),
      city: item.City,
      area: item.Area,
      customAddress: item.Address,
      addressType: item.Type,
      isAddressStoredInDB: true,
    }));
  }

  // Find the selected address details
  let selectedAddressDetails: SavedAddressDataType | null = null;
  if (selectedAddressIDFromStorage && fetchedAddresses.length > 0) {
    const selectedAddressID = Number(selectedAddressIDFromStorage);

    selectedAddressDetails = fetchedAddresses.find((address) => address.addressID === selectedAddressID) || null;
  }

  const addresses: AddressesSliceType = {
    selectedAddressID: selectedAddressIDFromStorage ? Number(selectedAddressIDFromStorage) : null,
    selectedAddressDetails,
    addresses: fetchedAddresses,
  };

  dispatch(addressesActions.setAddresses(addresses));
});
export const saveAddress = createAsyncThunk<string, { lat: number; lng: number; city: string; area: string; customAddress: string; addressType: string; isAddressStoredInDB: boolean; house: string; locationArea: string }, AsyncThunkConfig>(AddressesThunks.SaveAddress, async ({ addressID, lat, lng, city, area, customAddress, addressType, isAddressStoredInDB, house, locationArea }, { dispatch, getState }) => {
  const userData = getState().user;
  const addressesData = getState().addresses;
  const storeData = getState().store;
  let message = '';

  const userToken = GetCustomerTokenInLocalStorage();
  if (userData.isLoggedIn) {
    if (userToken) {
      await postAddAddress(
        {
          Address: customAddress,
          Latitude: `${lat}`,
          Longitude: `${lng}`,
          Type: addressType,
          City: `${lat},${lng}`,
          NearestLandmark: '',
          Area: area,
        },
        { token: userToken, contentType: 'application/json' }
      )
        .then(async (res) => {
          if (res && res.ResponseType === 1) {
            const newAddress: SavedAddressDataType = { id: Number(res.AddressID), addressID: Number(res.AddressID), customAddress, lat, lng, addressType, city, area, isAddressStoredInDB };
            const addressesDeepClone = deepClone(addressesData.addresses);
            addressesDeepClone.push(newAddress);
            dispatch(fetchAndSetNearestStoreData({ latitude: newAddress.lat, longitude: newAddress.lng }))
              .unwrap()
              .then((response) => {
                const addresses: AddressesSliceType = {
                  selectedAddressID: newAddress.addressID,
                  selectedAddressDetails: newAddress,
                  addresses: addressesDeepClone,
                  city: response,
                };
                localStorage.setItem('selectedAddressID', newAddress.addressID.toString());
                // mixpanel.track('addres_saved', {
                //   city: response,
                //   event_source: 'Web',
                //   store_id: storeData?.selectedStoreID?.toString() || '32',
                //   block: house,
                //   lat: newAddress.lat,
                //   long: newAddress.lng,
                //   area: locationArea,
                // });

                if (typeof window !== 'undefined') {
                  // window?.webengage?.track('addres_saved', {
                  //   city: response,
                  //   event_source: 'Web',
                  //   store_id: storeData?.selectedStoreID?.toString() || '32',
                  //   block: house,
                  //   lat: newAddress.lat,
                  //   long: newAddress.lng,
                  //   area: locationArea,
                  // });
                }
                dispatch(emptyCart({}));
                dispatch(addressesActions.setAddresses(addresses));
                message = res.message;
              });
          }
        })
        .catch((err) => console.log(err));
    }
  }
  return message;
});

export const deleteAddress = createAsyncThunk<boolean, { addressID: number }, AsyncThunkConfig>(AddressesThunks.DeleteAddress, async ({ addressID }, { dispatch, getState }) => {
  const addressesData = getState().addresses;
  const userData = getState().user;
  const userToken = GetCustomerTokenInLocalStorage();

  let apiResponseCompleted = false;
  let selectedAddressID = addressesData.selectedAddressID;
  let selectedAddressDetails = addressesData.selectedAddressDetails;
  const addresses = addressesData.addresses.filter((item) => item.addressID.toString() !== addressID.toString());
  if (selectedAddressID === addressID) {
    dispatch(emptyCart({}));
    if (addresses !== undefined) {
      localStorage.setItem('selectedAddressID', addresses[0]?.addressID ? addresses[0]?.addressID.toString() : '');
      selectedAddressID = addresses.length === 0 ? null : addresses[0].addressID;
      selectedAddressDetails = addresses.length === 0 ? null : addresses[0];

      if (addresses.length !== 0) dispatch(fetchAndSetNearestStoreData({ latitude: addresses[0]?.lat, longitude: addresses[0]?.lng }));
      else dispatch(storeActions.setStore(storeSliceIntialState));
    }
  }

  if (userData.isLoggedIn) {
    const deleteAddressAPI = await postDeleteAddress(Number(addressID), { token: userToken !== null ? userToken : '' });
    if (deleteAddressAPI?.ResponseType === 1) {
      apiResponseCompleted = true;
    }
    toast(deleteAddressAPI?.message, {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Slide,
      theme: 'dark',
    });
  }

  if (addresses.length === 0) {
    dispatch(addressesActions.setAddresses(addressesSliceIntialState));
    dispatch(storeActions.setStore(storeSliceIntialState));
  } else dispatch(addressesActions.setAddresses({ selectedAddressID, selectedAddressDetails, addresses }));

  return apiResponseCompleted;
});

export const updateAddress = createAsyncThunk<void, { addressID: number }, AsyncThunkConfig>(AddressesThunks.UpdateAddress, async ({ addressID }, { dispatch, getState }) => {
  const addressesData = getState().addresses;

  const selectedAddressID = addressID;
  const selectedAddressDetails = addressesData.addresses.find((item) => item.id === addressID) || null;

  dispatch(addressesActions.setAddresses({ selectedAddressID, selectedAddressDetails }));
});
