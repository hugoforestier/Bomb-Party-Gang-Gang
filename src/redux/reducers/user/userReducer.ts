import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import client from '../../../webClient';
import { Status } from '../utils';

const name = 'user';

interface InitialState {
  status: Status;
  username?: string;
  id?: number;
}

const initialState: InitialState = {
  status: 'none',
};

interface User {
  username: string;
  id: number;
}

interface GetUserResponse {
  user: User;
}

export const getUser = createAsyncThunk<User, undefined, {
  rejectValue: number,
}>(`${name}/login`, (args, thunk) => client.get<GetUserResponse>('/user')
  .then((res) => res.data.user)
  .catch((err) => {
    if (axios.isAxiosError(err) && err.response?.status !== undefined) {
      return thunk.rejectWithValue(err.response.status);
    }
    return thunk.rejectWithValue(400);
  }));

const slice = createSlice({
  name,
  initialState,
  reducers: {
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.id = action.payload.id;
        state.username = action.payload.username;
      })
      .addCase(getUser.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { resetUser } = slice.actions;
export default slice.reducer;
