import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WS_URL, JWT_LOCAL_STORAGE } from '../../../keys';
import { Status } from '../utils';
import { roomInfo, noRoom, rooms } from './infoHandlerReducer';

const infoActions = {
  rooms,
  roomInfo,
  noRoom,
};

const name = 'websocket';

interface InitialState {
  ws?: WebSocket;
  status: Status;
}

const initialState: InitialState = {
  status: 'none',
};

interface ConnectPayload {
  dispatch: any;
}

const slice = createSlice({
  initialState,
  name,
  reducers: {
    resetWS: (state) => {
      if (state.ws !== undefined) {
        state.ws.onclose = null;
        state.ws.close();
      }
      return initialState;
    },
    connectWS: (state, action: PayloadAction<ConnectPayload>) => {
      const ws = new WebSocket(WS_URL);
      state.status = 'loading';
      ws.onopen = () => {
        // we need to set a short timeout so that the function is called after onopen has returned
        setTimeout(() => action.payload.dispatch(slice.actions.connected()), 20);
        const jwt = localStorage.getItem(JWT_LOCAL_STORAGE);
        ws.send(JSON.stringify({ jwt }));
      };
      ws.onclose = () => action.payload.dispatch(slice.actions.notConnected());
      ws.onerror = () => action.payload.dispatch(slice.actions.notConnected());

      ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data);
          if (typeof data.info === 'string' && data.info in infoActions) {
            action.payload.dispatch(infoActions[data.info as keyof typeof infoActions](data));
          }
        } catch (e) {
          console.error(e);
        }
      };
      state.ws = ws;
    },
    connected: (state) => {
      state.status = 'success';
    },
    notConnected: (state) => {
      state.status = 'error';
      state.ws = undefined;
    },
  },
});

export const { resetWS, connectWS } = slice.actions;
export default slice.reducer;
