import { useEffect } from 'react';
import { AppDispatch, RootState, useAppSelector } from '../../types';
import { connectWS } from './connectionReducer';

export const getWsConnectionStatus = (state: RootState) => state.websocket.status;
export const getWs = (state: RootState) => state.websocket.ws;

/// Returns the status of the connection to the Websocket server
export function useWebSocket(dispatch: AppDispatch): WebSocket | null {
  const connectionStatus = useAppSelector(getWsConnectionStatus);
  const ws = useAppSelector(getWs);

  useEffect(() => {
    if (connectionStatus === 'none') {
      dispatch(connectWS({ dispatch }));
    }
  }, [dispatch, connectionStatus, ws]);

  return connectionStatus === 'success' ? ws! : null;
}
