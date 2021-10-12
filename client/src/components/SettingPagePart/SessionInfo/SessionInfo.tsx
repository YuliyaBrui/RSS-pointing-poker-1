import React, { useEffect, useRef, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input/Input';
import Button from 'antd/lib/button/button';
import { useSelector } from 'react-redux';
import ScramMasterInfo from '../../ScramMasterCard/ScramMasterCard';
import { RootState, store } from '../../../redux';
import { CLIENT_URL, socket } from '../../../socket';
import styles from './SessionInfo.module.scss';

const SessionInfo = (): JSX.Element => {
  const [editSession, setEditSession] = useState(false);
  const [sessionName, setSessionName] = useState('New session');
  const [copySuccess, setCopySuccess] = useState('');
 /* const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
  */
  const { gameID } = sessionStorage;
  const [URL, setURL] = useState(`${CLIENT_URL}/lobby/${gameID}`);

  useEffect(() => {
    window.addEventListener('click', () => {
      setCopySuccess('');
    });
  }, [copySuccess]);

  const sendSessionName = (): void => {
    socket.emit('SET_SESSION_NAME', gameID, sessionName);
  };
  window.onload = () => {
    setURL(`${CLIENT_URL}/lobby/${gameID}`);

  };
  return (
    <div className={styles.main__card_link_wrapper}>
      <ScramMasterInfo />
      <Card
        title="Session name:"
        extra={
          <Button
            type="ghost"
            className={styles.main__wrapper_icon}
            onClick={() => {
              setEditSession(!editSession);
              sendSessionName();
            }}
          >
            <EditOutlined style={{ fontSize: '150%', margin: '1%' }} />
          </Button>
        }
        className={styles.card__wrapper}
        // style={{ width: '30%', height: '100%' }}
      >
        <div className={styles.main__link_wrapper}>
          <Input
            className={!editSession ? styles.main__input_session_name : ''}
            size="middle"
            disabled={!editSession}
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            onPressEnter={() => {
              setEditSession(!editSession);
              sendSessionName();
            }}
           
          />
        </div>
      </Card>
      <Card title="Link to lobby:" className={styles.card__wrapper}>
        <div className={styles.main__link_wrapper}>
          <Input size="middle" value={URL} />

          <Button
            size="middle"
            type="primary"
            onClick={async () => {
              await navigator.clipboard.writeText(URL);
              setCopySuccess('link copied');
            }}
          >
            Copy
          </Button>
        </div>
        <div>{copySuccess}</div>
      </Card>
    </div>
  );
};

export default SessionInfo;
