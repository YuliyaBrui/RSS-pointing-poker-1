import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import styles from './Timer.module.scss';
import { socket } from '../../socket';

interface setRunning {
  running: (a: boolean) => void;
  changeVisibil: (a: number) => void;
}

const Timer = ({ running, changeVisibil }: setRunning): JSX.Element => {
  const [isRunning, setIsRunning] = useState(false);
  const time = useSelector(
    (state: RootState) => state.chatReducer.setting.roundTime,
  );
  const [seconds, setSeconds] = useState(+time);

  const location = useLocation();
/*
  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
  */
  const { gameID } = sessionStorage;
  const viewGameScore = useSelector(
    (state: RootState) => state.chatReducer.setting.changingCard,
  );

  // const { gameID } = sessionStorage;
  useEffect(() => {
    socket.on('ROUND_RUN', () => {
      setIsRunning(true);
    });
    socket.on('RESET_TIME', () => {
      setIsRunning(false);
      setSeconds(+time);
    });
    if (isRunning) {
      const id = window.setInterval(() => {
        if (seconds > 0) {
          setSeconds((second: number) => second - 1);
        } else if (seconds === 0) {
          socket.emit('VIEW_GAME_SCORE', gameID, viewGameScore);
          running(false);
          setIsRunning(false);
          changeVisibil(-1);
          setSeconds(+time);
        }
      }, 1000);
      return () => window.clearInterval(id);
    }
    return undefined;
  }, [seconds, isRunning]);

  return (
    <div className={styles.timer_wrapper}>
      {location.pathname === `/game/${gameID}` && (
        <div className={styles.timer_button}>
          {!isRunning ? (
            <Button
              type="primary"
              onClick={() => {
                setIsRunning(true);
                socket.emit('ROUND_RUN', gameID);
              }}
            >
              Run Round
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                setIsRunning(false);
                setSeconds(+time);
                socket.emit('REPEAT_VOTING', gameID);
              }}
            >
              Restart Round
            </Button>
          )}
        </div>
      )}
      <div>Timer</div>
      <div className={styles.timer}>
        <span className={styles.timer_seconds}>{seconds}</span>
        <span className={styles.timer_seconds}> sec</span>
      </div>
    </div>
  );
};

export default Timer;
