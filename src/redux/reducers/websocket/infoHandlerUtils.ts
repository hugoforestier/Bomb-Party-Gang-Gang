import { RootState } from '../../types';

export const getRoomInfo = (state: RootState) => state.infoHandler.room;
export const getRoomList = (state: RootState) => state.infoHandler.roomList;
