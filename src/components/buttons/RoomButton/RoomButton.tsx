import React from 'react';
import { ROOM_MAX_CAPACITY } from '../../../keys';
import styles from './RoomButton.module.scss';

export interface RoomButtonProps {
  name: string;
  players: Array<string>;
  selected: Boolean;
  onClick: (name: string) => any;
}

function RoomButton({
  name, players, selected, onClick,
}: RoomButtonProps) {
  const handleSelection = () => {
    if (onClick) {
      onClick(name);
    }
  };

  const getRoomState = () => {
    if (players.length === ROOM_MAX_CAPACITY) {
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
      <p>{`${name}`}</p>
      <p>{`${players.length}/${ROOM_MAX_CAPACITY}`}</p>
    </button>
  );
}

export default RoomButton;
