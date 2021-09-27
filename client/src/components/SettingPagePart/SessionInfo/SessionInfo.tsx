import React, { useEffect, useRef, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input/Input';
import Button from 'antd/lib/button/button';
import ScramMasterInfo from '../../ScramMasterCard/ScramMasterCard';
import './SessionInfo.scss';
import { RootState, store } from '../../../redux';
import { socket } from '../../../socket';

const SessionInfo = (): JSX.Element => {
  const [editSession, setEditSession] = useState(false);
  const [sessionName, setSessionName] = useState('New session');
  const state: RootState = store.getState();
  const [copySuccess, setCopySuccess] = useState('');
  const [URL, setURL] = useState(
    `http://localhost:3000/lobby/${state.formCreateReducer.IDGame}`,
  );
  useEffect(() => {
    window.addEventListener('click', () => {
      setCopySuccess('');
    });
  }, [copySuccess]);

  return (
    <div className="main__card-link-wrapper">
      <ScramMasterInfo />
      <Card
        title="Session name:"
        extra={
          <Button
            type="ghost"
            className="main__wrapper-icon"
            onClick={() => {
              setEditSession(!editSession);
              sendSessionName();
            }}
          >
            <EditOutlined style={{ fontSize: '150%', margin: '1%' }} />
          </Button>
        }
        style={{ width: '30%', height: '100%' }}
      >
        <div className="main__link-wrapper">
          <Input
            className={!editSession ? 'main__input_session-name' : ''}
            size="middle"
            disabled={!editSession}
            defaultValue={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            onPressEnter={() => {
              setEditSession(!editSession);
              sendSessionName();
            }}
          />
        </div>
      </Card>
      <Card title="Link to lobby:" style={{ width: '30%', height: '100%' }}>
        <div className="main__link-wrapper">
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
