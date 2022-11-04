import { RootState } from '../../types';

export const getLoginStatus = (state: RootState) => state.login.login;
export const getRegisterStatus = (state: RootState) => state.login.register;
export const getUsername = (state: RootState) => state.login.login.user?.username;
