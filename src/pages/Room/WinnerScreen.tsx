import React from 'react';
import { useTranslation } from 'react-i18next';
import TextButton from '../../components/buttons/TextButton/TextButton';
import { UserInfo } from '../../redux/reducers/websocket/types';
import styles from './Room.module.scss';
import PlayerUI from '../../modules/Player/PlayerUI';

interface Props {
  winner: UserInfo;
  userId: number;
  onClose: () => any;
}

export default function WinnerScreen({ winner, userId, onClose }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <PlayerUI
        userId={userId}
        player={{ lives: 0, userId: winner.id, username: winner.username }}
      >
        <h1 className={styles.username}>
          {t('won')}
        </h1>
      </PlayerUI>
      <TextButton
        label={winner.id === userId ? t('yay') : t('whatever')}
        className={styles.winnerButton}
        onClick={onClose}
      />
      <div />
    </>
  );
}
