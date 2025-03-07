import { PayloadAction } from '@reduxjs/toolkit';
import { CreditCardSliceType } from './slice';

type stateType = CreditCardSliceType;
type actionType = PayloadAction<Partial<CreditCardSliceType>>;

export const setCreditCard = (state: stateType, action: actionType) => {
  const { selected } = action.payload;

  state.selected = selected !== undefined ? selected : state.selected;
};
