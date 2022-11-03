import React from 'react';
import styles from './RoomButton.module.scss';

export interface RoomButtonProps {
  roomId: number;
  maxCapacity: number;
  players: Array<string>;
  selected: Boolean;
  onClick: (roomid: number) => any;
}

function RoomButton({
  roomId, maxCapacity, players, selected, onClick,
}: RoomButtonProps) {
  const handleSelection = () => {
    if (onClick) {
      onClick(roomId);
    }
  };

  const getRoomState = () => {
    if (players.length === maxCapacity) {
      return `${styles.roomButton} ${styles.full}`;
    }
    if (selected) {
      return `${styles.roomButton} ${styles.selected}`;
    }
    return styles.roomButton;
  };

  return (
    <button
      onClick={handleSelection}
      type="button"
      className={getRoomState()}
    >
      <p>{`Room #${roomId}`}</p>
      <p>{`${players.length}/${maxCapacity}`}</p>
    </button>
  );
}

export default RoomButton;
