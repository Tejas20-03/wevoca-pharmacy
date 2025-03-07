import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@/redux/store';
import { userActions, userSliceIntialState, UserSliceType } from './slice';
import { GetUserFromLocalStorage, SetUserInLocalStorage } from '@/functions/local-storage-methods';

const UserThunks = {
  SetUserDataFromLocalStorage: 'user/setUserDataFromLocalStorage',
  SetUserDataAndSaveInLocalStorage: 'user/setUserDataAndSaveInLocalStorage',
  LogoutUser: 'user/logoutUser',
};

export const setUserDataFromLocalStorage = createAsyncThunk<void, {}, AsyncThunkConfig>(UserThunks.SetUserDataFromLocalStorage, async ({ }, { dispatch }) => {
  const userData = await GetUserFromLocalStorage();
  dispatch(userActions.setUser(userData));
});

export const setUserDataAndSaveInLocalStorage = createAsyncThunk<void, { userData: UserSliceType }, AsyncThunkConfig>(UserThunks.SetUserDataAndSaveInLocalStorage, async ({ userData }, { dispatch }) => {
  dispatch(userActions.setUser(userData));
  await SetUserInLocalStorage(userData);
});

export const logoutUser = createAsyncThunk<void, {}, AsyncThunkConfig>(UserThunks.LogoutUser, async ({ }, { dispatch }) => {
  dispatch(userActions.setUser(userSliceIntialState));
  await SetUserInLocalStorage(userSliceIntialState);
});
