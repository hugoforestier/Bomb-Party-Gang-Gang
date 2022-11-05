import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROOM_MAX_CAPACITY, SIGN_IN_URL } from '../../keys';
import { resetLoginReducer } from '../../redux/reducers/login/loginReducer';
import { getWsConnectionStatus, useWebSocket } from '../../redux/reducers/websocket/connectionUtils';
import { getRoomInfo, getRoomList } from '../../redux/reducers/websocket/infoHandlerUtils';
import { useAppDispatch, useAppSelector } from '../../redux/types';

export default function Room() {
  const { name } = useParams();
  const dispatch = useAppDispatch();
  const ws = useWebSocket(dispatch);
  const wsStatus = useAppSelector(getWsConnectionStatus);
  const navigate = useNavigate();
  const clientRoom = useAppSelector(getRoomInfo);
  const roomList = useAppSelector(getRoomList);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (wsStatus === 'error') {
      dispatch(resetLoginReducer());
      navigate(SIGN_IN_URL);
    }
  }, [wsStatus, dispatch, navigate]);

  useEffect(() => {
    if (roomList !== undefined && clientRoom === null && ws !== null) {
      const room = roomList.find((r) => r.name === name);
      if (room === undefined || room.users.length >= ROOM_MAX_CAPACITY) {
        navigate('/lobby', { replace: true });
      }
    }
  }, [name, clientRoom, roomList, ws, navigate]);

  useEffect(() => {
    if (clientRoom === null && roomList !== undefined && ws !== null && joining === false) {
      ws.send(JSON.stringify({
        command: 'joinRoom',
        name,
      }));
      setJoining(true);
    }
  }, [clientRoom, name, roomList, ws, navigate, joining]);

  return (
    <div>
      {JSON.stringify(clientRoom)}
    </div>
  );
}
