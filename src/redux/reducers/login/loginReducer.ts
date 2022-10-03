import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import client, { addAuthTokenToClient } from '../../../webClient';
import { Status } from '../utils';

const name = 'login';

interface InitialState {
  login: {
    status: Status;
    error?: number;
    user?: {
      username: string;
      token: string;
    };
  };
  register: {
    status: Status;
    error?: number;
  };
}

const initialState: InitialState = {
  login: {
    status: 'none',
  },
  register: {
    status: 'none',
  },
};

type LoginArgs = {
  username: string;
  password: string;
};

type User = {
  username: string;
  token: string;
};

type LoginResponse = {
  jwt: string,
};

export const login = createAsyncThunk<User, LoginArgs, {
  rejectValue: number,
}>(`${name}/login`, (args, thunk) => client.post<LoginResponse>('/user/login', {
  username: args.username,
  password: args.password,
}).then((res) => {
  addAuthTokenToClient(res.data.jwt);
  return {
    username: args.username,
    token: res.data.jwt,
  } as User;
}).catch((err) => {
  if (axios.isAxiosError(err) && err.response?.status !== undefined) {
    return thunk.rejectWithValue(err.response.status);
  }
  return thunk.rejectWithValue(400);
}));

export const register = createAsyncThunk<number, LoginArgs, {
  rejectValue: number,
}>(`${name}/register`, (args, thunk) => client.post('/user/register', {
  username: args.username,
  password: args.password,
}).then((res) => res.status).catch((err) => {
  if (axios.isAxiosError(err) && err.response?.status !== undefined) {
    return thunk.rejectWithValue(err.response.status);
  }
  return thunk.rejectWithValue(400);
}));

const slice = createSlice({
  initialState,
  name,
  reducers: {
    resetLoginReducer: () => initialState,
    resetLogin: (state) => {
      state.login = initialState.login;
    },
    resetRegister: (state) => {
      state.register = initialState.register;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.register.status = 'loading';
      })
      .addCase(register.rejected, (state, action) => {
        state.register.error = action.payload;
        state.register.status = 'error';
      })
      .addCase(register.fulfilled, (state) => {
        state.register.status = 'success';
      })
      .addCase(login.pending, (state) => {
        state.login.status = 'loading';
      })
      .addCase(login.rejected, (state, action) => {
        state.login.error = action.payload;
        state.login.status = 'error';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.user = {
          username: action.payload.username,
          token: action.payload.token,
        };
        state.login.status = 'success';
      });
  },
});

export const { resetLoginReducer, resetLogin, resetRegister } = slice.actions;
export default slice.reducer;
