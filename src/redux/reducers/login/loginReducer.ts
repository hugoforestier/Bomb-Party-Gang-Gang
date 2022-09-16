import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../utils';

const name = 'login';

interface InitialState {
  user: {
    status: Status;
    username?: string;
    token?: string;
  };
}

const initialState: InitialState = {
  user: {
    status: 'none',
  },
};

type LoginArgs = {
  email: string;
  password: string;
};

type User = {
  username: string;
  token: string;
};

export const login = createAsyncThunk<User, LoginArgs>(`${name}/login`, async () => {
  const token = 'je suis un token';
  const username = 'prout';
  return {
    token,
    username,
  };
});

const slice = createSlice({
  initialState,
  name,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.user.status = 'loading';
      })
      .addCase(login.rejected, (state) => {
        state.user.status = 'error';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user!.token = action.payload.token;
        state.user!.username = action.payload.username;
        state.user!.status = 'success';
      });
  },
});

export const { reset } = slice.actions;
export default slice.reducer;
