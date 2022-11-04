import React, { useState } from 'react';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Lobby.module.scss';
import RoomButton from '../../components/buttons/RoomButton/RoomButton';
import TextButton from '../../components/buttons/TextButton/TextButton';
import IconButton from '../../components/buttons/IconButton/IconButton';
import Separator from '../../components/separators/Separator/Separator';
import { RoomDetails } from '../../redux/reducers/websocket/types';
import RoomInfoLobby from './RoomInfoLobby';
import { ROOM_MAX_CAPACITY, SIGN_IN_URL } from '../../keys';
import CreateRoomForm from './CreateRoomForm';
import { resetLoginReducer } from '../../redux/reducers/login/loginReducer';
import { useAppDispatch } from '../../redux/types';
import { useWebSocket } from '../../redux/reducers/websocket/connectionUtils';
import { getRoomList } from '../../redux/reducers/websocket/infoHandlerUtils';
import { useUsername } from '../../redux/reducers/user/userUtils';

export default function Lobby() {
  const [selectedRoom, setSelectedRoom] = useState(undefined as RoomDetails | undefined);
  const [roomCreation, setRoomCreation] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useWebSocket(dispatch);
  const rooms = useSelector(getRoomList);
  const username = useUsername(dispatch);

  const toggleRoomSelect = (roomName: string) => {
    if (selectedRoom?.name === roomName) {
      setSelectedRoom(undefined);
    } else {
      const room = rooms.find((r) => r.name === roomName);
      if ((room?.users.length ?? ROOM_MAX_CAPACITY) < ROOM_MAX_CAPACITY) {
        setSelectedRoom(room);
      }
    }
  };

  const onLogout = () => {
    dispatch(resetLoginReducer());
    navigate(SIGN_IN_URL);
  };

  let roomButtons = rooms.map((room) => (
    <RoomButton
      name={room.name}
      players={room.users.map((user) => user.username)}
      selected={selectedRoom?.name === room.name}
      onClick={toggleRoomSelect}
      key={room.name}
    />
  ));

  if (rooms.length === 0) {
    roomButtons = [<div className={styles.noRoom} key="text">{t('noRoom')}</div>];
  }

  return (
    <div id={styles.lobby}>
      <div className={styles.body}>
        <div className={styles.header}>
          <h1>{username}</h1>
          <IconButton
            iconName={faArrowRightFromBracket}
            onClick={onLogout}
          />
        </div>
        <div className={styles.roomSelection}>
          <div className={styles.roomsList}>
            {roomButtons}
          </div>
        </div>
        <div className={styles.footer}>
          <Separator className={styles.separator} text={t('or')} />
          <TextButton className={styles.playButton} label={t('CREATE ROOM')} onClick={() => setRoomCreation(true)} />
        </div>
      </div>
      {selectedRoom !== undefined
        && <RoomInfoLobby closeMenu={() => setSelectedRoom(undefined)} room={selectedRoom} />}
      {roomCreation && <CreateRoomForm closeForm={() => setRoomCreation(false)} />}
    </div>
  );
}
