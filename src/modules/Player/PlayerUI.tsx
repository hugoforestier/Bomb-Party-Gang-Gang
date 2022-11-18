import React from 'react';
import { faHeart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Player } from '../../redux/reducers/websocket/types';
import styles from './PlayerUI.module.scss';

interface Props {
  player: Player;
  userId: number;
  children?: React.ReactNode;
}

export default function PlayerUI({ player, userId, children }: Props) {
  const { t } = useTranslation();

  const hearts: React.ReactNode[] = [];

  for (let i = 0; i < player.lives; i += 1) {
    hearts.push(<FontAwesomeIcon className={styles.heart} key={i} icon={faHeart} />);
  }

  return (
    <div className={styles.user}>
      <div className={styles.username}>
        <h1>
          {player.userId === userId
          && t('you')}
        </h1>
        <h1>
          {player.username}
        </h1>
      </div>
      <FontAwesomeIcon icon={faUserCircle} className={styles.userIcon} />
      <br />
      {hearts}
      {children}
    </div>
  );
}

PlayerUI.defaultProps = {
  children: undefined,
};
