import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN_URL } from '../keys';
import { resetLoginReducer } from '../redux/reducers/login/loginReducer';
import { useWebSocket } from '../redux/reducers/websocket/connectionUtils';
import { getRoomList } from '../redux/reducers/websocket/infoHandlerUtils';
import { useAppDispatch, useAppSelector } from '../redux/types';
import { removeAuthTokenFromClient } from '../webClient';

export default function Lobby() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ws = useWebSocket(dispatch);
  const rooms = useAppSelector(getRoomList);

  const onLogout = () => {
    removeAuthTokenFromClient();
    dispatch(resetLoginReducer());
    navigate(SIGN_IN_URL);
  };

  return (
    <div className="Lobby">
      {`${ws === null ? 'not connected' : 'connected'} to websocket server`}
      <h1>Lobby</h1>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
      <br />
      Rooms:
      {JSON.stringify(rooms)}
    </div>
  );
}
