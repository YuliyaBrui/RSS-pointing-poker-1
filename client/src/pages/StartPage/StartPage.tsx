import React, { useEffect, useState } from 'react';
import { Alert, Button, Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './StartPage.module.scss';
import { FormCreateGame } from '../../components/FormCreateGame/FormCreateGame';
import { FormConnect } from '../../components/FormConnect/FormConnect';
import { Modal } from '../../components/modal/Modal';
import { getUsersParams } from '../../redux/actions/createSession';
import { ErrorGameID } from '../../components/FormConnect/ErrorGameID';
import { addGameID } from '../../redux/actions/chat';
import { IFormGameValue } from '../../redux/types/forms';
import { SERVER_URL } from '../../socket';

const StartPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const [URLValue, setURLValue] = useState('');
  const [URLError, setURLError] = useState('');
  const [activeFormCreate, setActiveFormCreate] = useState(false);
  const [activeFormConnect, setActiveFormConnect] = useState(false);
  const [activeFormError, setActiveFormError] = useState(false);

  const URLValueHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setURLValue(event.target.value);
    const regExp =
      /http:\/\/(localhost:3000)\/(lobby)\/(\w){8}-(\w){4}-(\w){4}-(\w){4}-(\w){12}\/?$/;
    if (regExp.test(String(event.target.value))) {
      console.log(event.target.value);
      setURLError('');
    } else {
      setURLError(`the link should look like ${SERVER_URL}/lobby/:id`);
    }
  };

  const checkGameID = (): void => {
    if (!URLValue.length) {
      setURLError('enter address');
    }
    if (!URLError.length && URLValue.length) {
      const url = new URL(`${URLValue}`);
      const gameID = String(url.pathname.slice(7, 43));
      const callback = (master: IFormGameValue): void => {
        if (master.name.length) {
          setActiveFormConnect(true);
          dispatch(addGameID(gameID));
          sessionStorage.setItem('gameID', gameID);
        } else {
          setActiveFormError(true);
        }
      };
      dispatch(getUsersParams(gameID, callback));
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.main_poker}> </div>
          <h2 className={styles.title}>Start your planning:</h2>
          <div className={styles.session}>
            <p
              className={styles.subtitle}
              style={{ width: '260px', textAlign: 'left' }}
            >
              Create session:
            </p>
            <Button
              type="primary"
              style={{ width: '260px' }}
              onClick={() => setActiveFormCreate(true)}
            >
              Start new game
            </Button>
          </div>
          <h2 className={styles.title}>OR:</h2>
          <p className={styles.subtitle}>Connect to lobby by URL:</p>
          <div className={styles.session}>
            <Input
              placeholder="Basic usage"
              style={{ width: '260px', height: '32px' }}
              value={URLValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                URLValueHandler(e);
              }}
            />
            <Button
              type="primary"
              style={{ width: '260px' }}
              onClick={checkGameID}
            >
              Connect
            </Button>
          </div>
          <p className={styles.error}>
            {URLError && <span className={styles.error}>{URLError}</span>}
          </p>
        </div>
      </div>
      <Modal active={activeFormCreate}>
        <FormCreateGame setActive={setActiveFormCreate} />
      </Modal>
      <Modal active={activeFormConnect}>
        <FormConnect setActive={setActiveFormConnect} />
      </Modal>
      <Modal active={activeFormError}>
        <ErrorGameID setActive={setActiveFormError} />
      </Modal>
    </>
  );
};

export default StartPage;
