import React from 'react';
import { useTranslation } from 'react-i18next';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../components/buttons/IconButton/IconButton';
import { RoomDetails } from '../../redux/reducers/websocket/types';
import styles from './RoomInfoLobby.module.scss';
import TextButton from '../../components/buttons/TextButton/TextButton';
import { ROOM_MAX_CAPACITY } from '../../keys';
import { useAppDispatch } from '../../redux/types';
import { useWebSocket } from '../../redux/reducers/websocket/connectionUtils';

interface Props {
  room: RoomDetails;
  closeMenu: () => any;
}

export default function RoomInfoLobby({ room, closeMenu }: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const ws = useWebSocket(dispatch);
  const joinRoom = () => {
    ws!.send(JSON.stringify({
      command: 'joinRoom',
      name: room.name,
    }));
  };

  const playerList = room.users.map((player) => (
    <p key={player.username}>{player.username}</p>
  ));

  return (
    <div className={styles.playersListOverlay}>
      <div className={styles.overlayHeader}>
        <IconButton iconName={faXmark} onClick={closeMenu} inverted />
        <h2 className={styles.roomTitle}>{room.name}</h2>
      </div>
      <h2 className={styles.roomCapacity}>{t('players')}</h2>
      <h2 className={styles.playerCount}>
        {room.users.length}
        /
        {ROOM_MAX_CAPACITY}
      </h2>
      {playerList}
      <TextButton className={styles.playButton} label={t('play')} onClick={joinRoom} />
    </div>
  );
}
