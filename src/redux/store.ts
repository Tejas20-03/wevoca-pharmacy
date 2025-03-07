import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import addressesSlice from './addresses/slice';
import cartSlice from './cart/slice';
import creditCardSlice from './credit-card/slice';
import mapSlice from './map/slice';
import productsSlice from './products/slice';
import searchSlice from './search/slice';
import storeSlice from './store/slice';
import userSlice from './user/slice';
import addressSliceReducer from './address-popup/slice';
import cartPopupReducer from './cart-remove-popup/slice';
import LoginSliceReducer from './Login-popup/slice';
import sidebarToggleSlice from './sidebar-toggle/slice';
import StoreSlice from './Store-popup/slice';
import PromoSlice from './promo-code/slice';
import VoucherSliceReducer from './voucher-popup/slice';
import SavedCardSliceReducer from './saved-card/slice';
import CancelOrderSliceReducer from './cancel-order-popup/slice';
import ProductOrderReviewSlice from './order-review-popup/slice';
import ToastMessageReducer from './toast-message/slice';
import locationSlice from './location_slice/location-slice';
import PrescriptionSlice from './prescription/slice';
import permissionDeninedReducer from './permission-denied-popup/slice';
import orderDetailSlice from './order-detail/slice';
import chatEndSlice from './chat-end-popup/slice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  store: storeSlice.reducer,
  search: searchSlice.reducer,
  products: productsSlice.reducer,
  creditCard: creditCardSlice.reducer,
  cart: cartSlice.reducer,
  addresses: addressesSlice.reducer,
  location: locationSlice.reducer,
  map: mapSlice.reducer,
  AddressPopup: addressSliceReducer,
  cartPopup: cartPopupReducer,
  LoginPopup: LoginSliceReducer,
  toastMessage: ToastMessageReducer,
  sidebarToggle: sidebarToggleSlice,
  StorePopup: StoreSlice,
  promoCode: PromoSlice,
  Voucher: VoucherSliceReducer,
  savedCard: SavedCardSliceReducer,
  cancelOrderPopup: CancelOrderSliceReducer,
  permissionDeninedPopup: permissionDeninedReducer,
  prescription: PrescriptionSlice.reducer,
  ProductOrderReviewSlice,
  orderDetail: orderDetailSlice.reducer,
  chatEndSlice: chatEndSlice.reducer,
});
export const storeVal = configureStore({ reducer: rootReducer });
const makeStore = () => {
  return storeVal;
};

const wrapper = createWrapper(makeStore, { debug: false });
export default wrapper;

export type Store = ReturnType<typeof makeStore>;
export type StoreState = ReturnType<Store['getState']>;
export type StoreDispatch = Store['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, StoreState, unknown, Action>;

export type ActionVoidArgs = Record<string, never>; // {}

export type AsyncThunkConfig = {
  state: StoreState;
  dispatch: StoreDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};
