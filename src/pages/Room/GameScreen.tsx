import React from 'react';
import { Player } from '../../redux/reducers/websocket/types';
import PlayerUI from '../../modules/Player/PlayerUI';
import styles from './GameScreen.module.scss';

interface Props {
  player: Player;
  userId: number;
  statement: string;
}

export default function GameScreen({
  player, userId, statement,
}: Props) {
  return (
    <>
      <PlayerUI player={player} userId={userId}>
        <div className={styles.statement}>
          {statement}
        </div>
      </PlayerUI>
      <div />
    </>
  );
}
