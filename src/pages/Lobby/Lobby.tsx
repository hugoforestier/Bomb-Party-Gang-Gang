import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './Lobby.module.scss';
import RoomButton from '../../components/buttons/RoomButton/RoomButton';
import TextButton from '../../components/buttons/TextButton/TextButton';

export default function Lobby() {
  const [selectedRoom, setSelectedRoom] = useState(0);

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

  const addRoom = () => {};

  const play = () => {};

  return (
    <div id={styles.lobby}>
      <div className={styles.body}>
        <div className={styles.header}>
          <h1>Player52824</h1>
          <button type="button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </button>
        </div>
        <div className={styles.roomSelection}>
          <button className={styles.addRoomButton} type="button" onClick={addRoom}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
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
        <div className={styles.roomPlayersMobile}>
          <h2>PLAYERS</h2>
          {rooms[selectedRoom].players.map((player) => (
            <p key={player}>{player}</p>
          ))}
        </div>
        <TextButton className={styles.playButton} label="PLAY" onClick={play} />
      </div>
      <div className={styles.roomPlayersDesktop}>
        <h2>PLAYERS</h2>
        <h2 className={styles.roomCapacity}>
          {`${rooms[selectedRoom].players.length}/${rooms[selectedRoom].maxCapacity}`}
        </h2>
        {rooms[selectedRoom].players.map((player) => (
          <p key={player}>{player}</p>
        ))}
      </div>
    </div>
  );
}
