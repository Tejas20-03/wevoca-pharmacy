import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { setSearch } from './reducer';

export const searchSliceIntialState: SearchSliceType = {
  value: '',
  autocomplete: '',
  history: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState: searchSliceIntialState,
  reducers: { setSearch },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state) => {
      // Update the state based on the HYDRATE action
      return { ...state };
    });
  },
});

export default searchSlice;
export const searchActions = searchSlice.actions;
export type SearchSliceType = {
  value: string;
  autocomplete: string;
  history: string[];
};
