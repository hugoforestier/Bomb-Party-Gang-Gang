import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room, RoomList } from './types';

const name = 'websocketHandler';

interface InitialState {
  room: Room | null;
  roomList?: RoomList;
}

const initialState: InitialState = {
  room: null,
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
    roomInfo: (state, action: PayloadAction<InfoPayload>) => {
      state.room = action.payload.roomInfo;
    },
    noRoom: (state) => {
      state.room = null;
    },
  },
});

export const {
  resetWSInfo, roomInfo, noRoom, rooms,
} = slice.actions;
export default slice.reducer;
