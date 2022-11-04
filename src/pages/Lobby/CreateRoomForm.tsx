import React, { useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import IconButton from '../../components/buttons/IconButton/IconButton';
import TextButton from '../../components/buttons/TextButton/TextButton';
import styles from './CreateRoomForm.module.scss';

interface Props {
  closeForm: () => any;
  open: boolean;
}

export default function CreateRoomForm({ closeForm, open }: Props) {
  const { t } = useTranslation();
  const [roomName, setRoomName] = useState('');

  const createRoom = () => {
    console.log(roomName);
  };

  if (!open) {
    return (<span />);
  }

  return (
    <div className={styles.creationRoomOverlay}>
      <div className={styles.overlayHeader}>
        <IconButton iconName={faXmark} onClick={closeForm} inverted />
        <h2 className={styles.creationTitle}>CREATE</h2>
      </div>
      <div className={styles.instructions}>
        <input
          id="roomName"
          type="text"
          placeholder={t('TYPE NAME...')}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <TextButton className={styles.playButton} label={t('CREATE')} onClick={createRoom} />
    </div>
  );
}
