import React from 'react';
import Card from 'antd/lib/card';
import { UserOutlined } from '@ant-design/icons';
import './ScramMasterInfo.scss';
import { RootState, store } from '../../../redux';

const ScramMasterInfo = (): JSX.Element => {
  const state: RootState = store.getState();
  const asd = 123;
  return (
    <Card title="Scram master:" style={{ width: '30%', height: '100%' }}>
      <div className="main__scram-master-info">
        <UserOutlined style={{ fontSize: '500%' }} />
        <div className="main__scram-master-description">
          <h3>
            {state.formCreateGame.masters.length < 1
              ? 'Rick Morty'
              : `${state.formCreateGame.masters[0].name} ${state.formCreateGame.masters[0].lastName}`}
          </h3>
          <p>
            {state.formCreateGame.masters.length < 1
              ? 'team-leader'
              : `${state.formCreateGame.masters[0].jobPosition}`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ScramMasterInfo;
