import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input/Input';
import Button from 'antd/lib/button/button';
import ScramMasterInfo from '../../ScramMasterCard/ScramMasterCard';
import './SessionInfo.scss';
import { RootState, store } from '../../../redux';

const SessionInfo = (): JSX.Element => {
  const [editSession, setEditSession] = useState(false);
  const [sessionName, setSessionName] = useState('New session');
  const state: RootState = store.getState();
  return (
    <div className="main__card-link-wrapper">
      <ScramMasterInfo />
      <Card
        title="Session name:"
        extra={
          <Button
            type="ghost"
            className="main__wrapper-icon"
            onClick={() => setEditSession(!editSession)}
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
            onPressEnter={() => setEditSession(!editSession)}
          />
        </div>
      </Card>
      <Card title="Link to lobby:" style={{ width: '30%', height: '100%' }}>
        <div className="main__link-wrapper">
          <Input size="middle" value={state.formCreateReducer.IDGame} />
          <Button size="middle" type="primary">
            Copy
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SessionInfo;
/* "https://pokerstars.com" */
