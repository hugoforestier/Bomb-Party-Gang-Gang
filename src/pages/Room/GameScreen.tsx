import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Player } from '../../redux/reducers/websocket/types';
import PlayerUI from '../../modules/Player/PlayerUI';
import styles from './GameScreen.module.scss';
import Form from '../../components/forms/Form';
import { useWebSocket } from '../../redux/reducers/websocket/connectionUtils';
import { useAppDispatch } from '../../redux/types';

interface Props {
  player: Player;
  userId: number;
  statement: string;
  input: string;
  currentPlayer: number;
}

export default function GameScreen({
  player, userId, statement, input, currentPlayer,
}: Props) {
  const [timerStyle, setTimerStyle] = useState({} as React.CSSProperties);
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const ws = useWebSocket(dispatch);
  const [userInput, setInput] = useState('');
  const { t } = useTranslation();

  const restartAnimation = () => {
    setTimerStyle({ animationName: 'none' });
  };

  useEffect(() => {
    if (timerStyle.animationName === 'none') {
      setTimeout(() => {
        setTimerStyle({});
      }, 10);
    }
  }, [timerStyle]);

  useEffect(() => {
    restartAnimation();
    setInput('');
    ref.current?.focus();
  }, [currentPlayer]);

  useEffect(() => {
    if (userId === player.userId && input !== userInput) {
      ws?.send(JSON.stringify({
        command: 'setInput',
        userInput,
      }));
    }
  }, [userId, player, userInput, ws, input]);

  const sendInput = () => {
    ws?.send(JSON.stringify({
      command: 'submitWord',
    }));
    setInput('');
  };

  return (
    <>
      <div className={styles.timer} style={timerStyle} />
      <PlayerUI player={player} userId={userId}>
        <div className={styles.statement}>
          {statement}
        </div>
      </PlayerUI>
      {userId === player.userId
        ? (
          <Form onSubmit={sendInput}>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={userInput}
              ref={ref}
              className={styles.input}
              placeholder={t('typeWord')}
            />
          </Form>
        )
        : (
          <div className={styles.input}>
            {input}
          </div>
        )}
    </>
  );
}
