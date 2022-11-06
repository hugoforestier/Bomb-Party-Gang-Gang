import React from 'react';
import {
  faArrowLeft, faCheck, faHeart, faSkull,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { ROOM_MAX_CAPACITY } from '../../keys';
import { UserInfo, Player } from '../../redux/reducers/websocket/types';
import styles from './PlayerList.module.scss';

interface Props {
  users: UserInfo[];
  players?: Player[];
  showPlayers?: boolean;
  currentTurn?: number;
}

function CheckMark({ checked }: { checked: boolean }) {
  return (
    <div className={styles.checkmark}>
      {checked && <FontAwesomeIcon icon={faCheck} />}
    </div>
  );
}

function Heart({ lives }: {
  lives: number
}) {
  if (lives === 0) {
    return (
      <div className={styles.lives}>
        <FontAwesomeIcon icon={faSkull} />
      </div>
    );
  }
  return (
    <div className={styles.heartCounter}>
      <div className={styles.lives}>
        {lives}
      </div>
      <FontAwesomeIcon icon={faHeart} />
    </div>
  );
}

export default function PlayerList({
  users, players, showPlayers, currentTurn,
}: Props) {
  const { t } = useTranslation();

  const userList = users.map((user) => (
    <div key={user.id} className={styles.player}>
      {players !== undefined
        && <CheckMark checked={players.find((p) => p.userId === user.id) !== undefined} />}
      <div className={styles.username}>
        {user.username}
      </div>
    </div>
  ));

  const playerList = players?.map((player, index) => (
    <div key={player.userId} className={styles.player}>
      <div className={styles.turnArrow}>
        {currentTurn === index
          && <FontAwesomeIcon icon={faArrowLeft} />}
      </div>
      <Heart lives={player.lives} />
      <div className={styles.username}>
        {player.username}
      </div>
    </div>
  ));

  return (
    <div className={styles.list}>
      <h1 className={styles.title}>
        {t('players')}
      </h1>
      <h2 className={styles.playerCount}>
        {users.length}
        /
        {ROOM_MAX_CAPACITY}
      </h2>
      <div className={styles.playerList}>
        {showPlayers
          ? playerList
          : userList}
      </div>
    </div>
  );
}

PlayerList.defaultProps = {
  showPlayers: false,
  players: undefined,
  currentTurn: 0,
};
