/* eslint-disable operator-linebreak */
/* eslint-disable indent */
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
        {typeof state.formCreateReducer.masters[0].avatarURL !== 'string' ||
        state.formCreateReducer.masters[0].avatarURL === '' ? (
          <UserOutlined style={{ fontSize: '500%' }} />
        ) : (
          <div className={styles.main__scram_master__container_img}>
            <img
              className={styles.main__scram_master__img}
              src={state.formCreateReducer.masters[0].avatarURL}
              alt="avatar"
            />
          </div>
        )}
        <div className={styles.main__scram_master_description}>
          <h3>{`${state.formCreateReducer.masters[0].name} ${state.formCreateReducer.masters[0].lastName}`}</h3>
          <p>{state.formCreateReducer.masters[0].jobPosition}</p>
        </div>
      </div>
    </Card>
  );
};

export default ScramMasterInfo;
