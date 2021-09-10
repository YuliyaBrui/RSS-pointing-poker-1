import React from 'react';
import Card from 'antd/lib/card';
import { UserOutlined } from '@ant-design/icons';
import styles from './ScramMasterCard.module.scss';
import { RootState, store } from '../../redux';

const ScramMasterInfo = (): JSX.Element => {
  const state: RootState = store.getState();
  return (
    <Card title="Scram master:" style={{ width: '30%', height: '100%' }}>
      <div className={styles.main__scram_master_info}>
        {typeof state.formReducer.masters[0].avatarURL === 'string' ? (
          <img src={state.formReducer.masters[0].avatarURL} alt="avatar" />
        ) : (
          <UserOutlined style={{ fontSize: '500%' }} />
        )}
        <div className={styles.main__scram_master_description}>
          <h3>{`${state.formReducer.masters[0].name} ${state.formReducer.masters[0].lastName}`}</h3>
          <p>{state.formReducer.masters[0].jobPosition}</p>
        </div>
      </div>
    </Card>
  );
};

export default ScramMasterInfo;
