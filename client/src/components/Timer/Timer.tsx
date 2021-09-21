import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import styles from './Timer.module.scss';

const Timer = (): JSX.Element => {
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const id = window.setInterval(() => {
        if (seconds > 0) {
          setSeconds((second) => second - 1);
        }
      }, 1000);
      return () => window.clearInterval(id);
    }
    return undefined;
  }, [seconds, isRunning]);

  return (
    <div className={styles.timer_wrapper}>
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
          <div className={styles.buttons}>
            <Button
              type="primary"
              onClick={() => {
                setIsRunning(false);
                setSeconds(60);
              }}
            >
              Restart Round
            </Button>
            <Button type="primary" className={styles.button}>
              Next Issue
            </Button>
          </div>
        )}
      </div>
      <div className={styles.timer}>
        <span className={styles.timer_seconds}>{seconds}</span>
        <span className={styles.timer_seconds}> sec</span>
      </div>
    </div>
  );
};

export default Timer;
