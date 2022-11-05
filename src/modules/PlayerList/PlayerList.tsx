import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ROOM_MAX_CAPACITY } from '../../keys';
import { UserInfo, Player } from '../../redux/reducers/websocket/types';
import styles from './PlayerList.module.scss';

interface Props {
  users: UserInfo[];
  players?: Player[];
  showPlayers?: boolean;
}

function CheckMark({ checked }: { checked: boolean }) {
  return (
    <div className={styles.checkmark}>
      {checked && <FontAwesomeIcon icon={faCheck} />}
    </div>
  );
}

export default function PlayerList({
  users, players, showPlayers,
}: Props) {
  const { t } = useTranslation();

  if (showPlayers) {
    return (<div />);
  }

  const userList = users.map((user) => (
    <div key={user.id} className={styles.player}>
      {players !== undefined
      && <CheckMark checked={players.find((p) => p.userId === user.id) !== undefined} /> }
      <div className={styles.username}>
        {user.username}
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
        {userList}
      </div>
    </div>
  );
}

PlayerList.defaultProps = {
  showPlayers: false,
  players: undefined,
};
