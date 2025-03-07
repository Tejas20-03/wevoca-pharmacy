import { PayloadAction } from '@reduxjs/toolkit';
import { ProductsSliceType } from './slice';

type stateType = ProductsSliceType;
type actionType = PayloadAction<Partial<ProductsSliceType>>;

export const setProducts = (state: stateType, action: actionType) => {
    const { arrangeForMeProductIDs } = action.payload;

    state.arrangeForMeProductIDs = (arrangeForMeProductIDs !== undefined) ? arrangeForMeProductIDs : state.arrangeForMeProductIDs;
};
