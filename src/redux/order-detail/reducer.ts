import { PayloadAction } from '@reduxjs/toolkit';
import { UserSliceType } from './slice';

type stateType = UserSliceType;
type actionType = PayloadAction<Partial<UserSliceType>>;

export const setUser = (state: stateType, action: actionType) => {
  const { userID, userName, phoneNum, email, authToken } = action.payload;

  state.userID = userID !== undefined ? userID : state.userID;
  state.userName = userName !== undefined ? userName : state.userName;
  state.phoneNum = phoneNum !== undefined ? phoneNum : state.phoneNum;
  state.email = email !== undefined ? email : state.email;
  state.authToken = authToken !== undefined ? authToken : state.authToken;
  state.isLoggedIn = state.userID !== '' ? true : false;
};
