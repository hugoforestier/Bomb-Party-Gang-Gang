import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import IconButton from '../../components/buttons/IconButton/IconButton';
import TextButton from '../../components/buttons/TextButton/TextButton';
import { ROOM_MAX_CAPACITY, SIGN_IN_URL } from '../../keys';
import PlayerList from '../../modules/PlayerList/PlayerList';
import { resetLoginReducer } from '../../redux/reducers/login/loginReducer';
import { useUserId } from '../../redux/reducers/user/userUtils';
import { getWsConnectionStatus, useWebSocket } from '../../redux/reducers/websocket/connectionUtils';
import { getRoomInfo, getRoomList } from '../../redux/reducers/websocket/infoHandlerUtils';
import { useAppDispatch, useAppSelector } from '../../redux/types';
import Loading from './Loading';
import styles from './Room.module.scss';
import WinnerScreen from './WinnerScreen';

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
  const { t } = useTranslation();
  const userId = useUserId(dispatch);
  const [showWinner, setShowWinner] = useState(false);

  const userIsReady = (clientRoom?.players.find((p) => p.userId === userId) !== undefined) ?? false;

  const readyButton = (
    <TextButton
      className={`${styles.readyButton} ${userIsReady ? styles.filledButton : ''}`}
      label={userIsReady ? t('unready') : t('ready')}
      filled={!userIsReady}
      onClick={() => {
        ws?.send(JSON.stringify({
          command: 'setReady',
          isReady: !userIsReady,
        }));
      }}
    />
  );

  useEffect(() => {
    if (wsStatus === 'error') {
      dispatch(resetLoginReducer());
      navigate(SIGN_IN_URL);
    }
  }, [wsStatus, dispatch, navigate]);

  useEffect(() => {
    if (clientRoom?.started) {
      setShowWinner(true);
    }
  }, [clientRoom]);

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

  let startButton = <div className={styles.waiting} />;
  if (userIsReady && clientRoom.players.length === 1) {
    startButton = (
      <div className={styles.waiting}>
        {t('waitingForUsers')}
      </div>
    );
  } else if (userIsReady) {
    startButton = (
      <TextButton className={styles.start} label={t('start')} />
    );
  }

  let content: React.ReactNode | undefined;
  let showMain = false;

  if (clientRoom.started === false && showWinner) {
    content = (
      <>
        {readyButton}
        {startButton}
      </>
    );
  } else if (clientRoom.started === false) {
    showMain = true;
    if (clientRoom.lastWinner === null) {
      /* setShowWinner(false);
       * return (
       *   <div />
       * ); */
    }
    content = (
      <WinnerScreen
        userId={userId ?? -1}
        winner={clientRoom.users[0]}
        onClose={() => setShowWinner(false)}
      />
    );
  }

  return (
    <div className={`${styles.wrapper} ${showMain ? styles.showMain : ''}`}>
      <div className={styles.main}>
        {roomHeader(false)}
        {content}
      </div>
      <div className={styles.playerList}>
        {roomHeader(true)}
        <PlayerList
          users={clientRoom.users}
          players={clientRoom.players}
          showPlayers={clientRoom?.started}
        />
        {readyButton}
        {startButton}
      </div>
    </div>
  );
}
