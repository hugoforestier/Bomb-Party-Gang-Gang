import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IconButton from '../../components/buttons/IconButton/IconButton';
import { ROOM_MAX_CAPACITY, SIGN_IN_URL } from '../../keys';
import { resetLoginReducer } from '../../redux/reducers/login/loginReducer';
import { getWsConnectionStatus, useWebSocket } from '../../redux/reducers/websocket/connectionUtils';
import { getRoomInfo, getRoomList } from '../../redux/reducers/websocket/infoHandlerUtils';
import { useAppDispatch, useAppSelector } from '../../redux/types';
import Loading from './Loading';
import styles from './Room.module.scss';

export default function Room() {
  const { name } = useParams();
  const dispatch = useAppDispatch();
  const ws = useWebSocket(dispatch);
  const wsStatus = useAppSelector(getWsConnectionStatus);
  const navigate = useNavigate();
  const clientRoom = useAppSelector(getRoomInfo);
  const roomList = useAppSelector(getRoomList);
  const [joining, setJoining] = useState(false);
  const [leaving, setLeaving] = useState(false);

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

  useEffect(() => {
    if (leaving && clientRoom === null) {
      navigate('/lobby');
    }
  }, [leaving, ws, navigate, clientRoom]);

  if (!clientRoom) {
    return (
      <Loading />
    );
  }

  const leaveRoom = () => {
    // so we don't rejoin
    setJoining(true);
    setLeaving(true);
    ws?.send(JSON.stringify({
      command: 'leaveRoom',
    }));
  };

  const roomHeader = (inverted: boolean) => (
    <div className={styles.roomTitleBar}>
      <IconButton
        iconName={faArrowRightFromBracket}
        onClick={leaveRoom}
        inverted={inverted}
      />
      <h1>
        {clientRoom.name}
      </h1>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        {roomHeader(false)}
        {JSON.stringify(clientRoom)}
      </div>
      <div className={styles.playerList}>
        {roomHeader(true)}
        {JSON.stringify(clientRoom.users)}
      </div>
    </div>
  );
}
