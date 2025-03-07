import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { setUser } from './reducer';

export const userSliceIntialState: UserSliceType = {
  isLoggedIn: false,
  userID: '',
  userName: '',
  phoneNum: '',
  email: '',
  authToken: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState: userSliceIntialState,
  reducers: { setUser },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state) => {
      // Update the state based on the HYDRATE action
      return { ...state };
    });
  },
});

export default userSlice;
export const userActions = userSlice.actions;
export type UserSliceType = {
  isLoggedIn: boolean;
  userID: string;
  userName: string;
  phoneNum: string;
  email: string;

  authToken?: string;
};
