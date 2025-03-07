import { PayloadAction } from '@reduxjs/toolkit';
import { SearchSliceType } from './slice';

type stateType = SearchSliceType;
type actionType = PayloadAction<Partial<SearchSliceType>>;

export const setSearch = (state: stateType, action: actionType) => {
    const { value, history, autocomplete } = action.payload;

    state.value = (value !== undefined) ? value : state.value;
    state.history = (history !== undefined) ? history : state.history;
    state.autocomplete = (autocomplete !== undefined) ? autocomplete : state.autocomplete;
};
