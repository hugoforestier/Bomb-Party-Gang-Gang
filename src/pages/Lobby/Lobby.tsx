import React, { useState } from 'react';
import { faArrowRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import styles from './Lobby.module.scss';
import RoomButton from '../../components/buttons/RoomButton/RoomButton';
import TextButton from '../../components/buttons/TextButton/TextButton';
import IconButton from '../../components/buttons/IconButton/IconButton';
import Separator from '../../components/separators/Separator/Separator';

export default function Lobby() {
  const [selectedRoom, setSelectedRoom] = useState(-1);
  const [roomCreation, setRoomCreation] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const { t } = useTranslation();

  const rooms = [
    { id: 0, maxCapacity: 5, players: ['jamil', 'guillaume', 'hugo'] },
    { id: 1, maxCapacity: 5, players: ['jamil', 'jamill', 'jamilll', 'jamillll', 'jamilllll'] },
    { id: 2, maxCapacity: 5, players: ['jamil'] },
    { id: 3, maxCapacity: 5, players: ['jamil'] },
    { id: 4, maxCapacity: 5, players: ['jamil'] },
    { id: 5, maxCapacity: 5, players: ['jamil'] },
    { id: 6, maxCapacity: 5, players: ['jamil'] },
  ];

  const selectRoom = (roomId: number) => {
    setSelectedRoom(roomId);
  };

  const handleLogout = () => {};

  const createRoom = () => { console.log(newRoomName); };

  return (
    <div id={styles.lobby}>
      <div className={styles.body}>
        <div className={styles.header}>
          <h1>Player52824</h1>
          <IconButton
            iconName={faArrowRightFromBracket}
            onClick={handleLogout}
          />
        </div>
        <div className={styles.roomSelection}>
          <div className={styles.roomsList}>
            {rooms.map((room) => (
              <RoomButton
                roomId={room.id}
                maxCapacity={room.maxCapacity}
                players={room.players}
                selected={selectedRoom === room.id}
                onClick={selectRoom}
                key={room.id}
              />
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <Separator className={styles.separator} text={t('or')} />
          <TextButton className={styles.playButton} label={t('CREATE ROOM')} onClick={() => setRoomCreation(true)} />
        </div>
      </div>
      {selectedRoom !== -1 && rooms[selectedRoom].players.length !== rooms[selectedRoom].maxCapacity
        ? (
          <div className={styles.playersListOverlay}>
            <div className={styles.overlayHeader}>
              <IconButton iconName={faXmark} onClick={() => setSelectedRoom(-1)} inverted />
              <h2 className={styles.roomTitle}>{t(`Room #${selectedRoom}`)}</h2>
            </div>
            <h2 className={styles.roomCapacity}>{t(`PLAYERS ${rooms[selectedRoom].players.length}/${rooms[selectedRoom].maxCapacity}`)}</h2>
            {rooms[selectedRoom].players.map((player) => (
              <p key={player}>{player}</p>
            ))}
            <TextButton className={styles.playButton} label={t('PLAY')} />
          </div>
        ) : null}
      {roomCreation
        ? (
          <div className={styles.creationRoomOverlay}>
            <div className={styles.overlayHeader}>
              <IconButton iconName={faXmark} onClick={() => setRoomCreation(false)} inverted />
              <h2 className={styles.creationTitle}>CREATE</h2>
            </div>
            <div className={styles.instructions}>
              <input
                id="roomName"
                type="text"
                placeholder={t('TYPE NAME...')}
                onChange={(e) => setNewRoomName(e.target.value)}
              />
            </div>
            <TextButton className={styles.playButton} label={t('CREATE')} onClick={createRoom} />
          </div>
        ) : null}
    </div>
  );
}
