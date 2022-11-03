import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from './types';

const name = 'websocketHandler';

interface InitialState {
  room?: Room;
  roomList: Room[];
}

const initialState: InitialState = {
  roomList: [],
};

type InfoPayload = any;

const slice = createSlice({
  initialState,
  name,
  reducers: {
    resetWSInfo: () => initialState,
    rooms: (state, action: PayloadAction<InfoPayload>) => {
      state.roomList = action.payload.list;
    },
    infoRoom: (state, action: PayloadAction<InfoPayload>) => {
      state.room = action.payload.roomInfo;
    },
    noRoom: (state) => {
      state.room = undefined;
    },
  },
});

export const {
  resetWSInfo, infoRoom, noRoom, rooms,
} = slice.actions;
export default slice.reducer;
