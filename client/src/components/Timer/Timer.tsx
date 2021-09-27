import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import styles from './Timer.module.scss';

const Timer = (): JSX.Element => {
  const time = useSelector((state: RootState) => state.gameSetting.roundTime);
  const [seconds, setSeconds] = useState(time);
  const [isRunning, setIsRunning] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (isRunning) {
      const id = window.setInterval(() => {
        if (seconds > 0) {
          setSeconds((second: number) => second - 1);
        }
      }, 1000);
      return () => window.clearInterval(id);
    }
    return undefined;
  }, [seconds, isRunning]);

  return (
    <div className={styles.timer_wrapper}>
      {location.pathname === '/game' && (
        <div className={styles.timer_button}>
          {!isRunning ? (
            <Button
              type="primary"
              onClick={() => {
                setIsRunning(true);
              }}
            >
              Run Round
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                setIsRunning(false);
                setSeconds(time);
              }}
            >
              Restart Round
            </Button>
          )}
        </div>
      )}
      <div className={styles.timer}>
        <span className={styles.timer_seconds}>{seconds}</span>
        <span className={styles.timer_seconds}> sec</span>
      </div>
    </div>
  );
};

export default Timer;
