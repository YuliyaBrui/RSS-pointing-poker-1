/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import React, { useEffect } from 'react';
import Card from 'antd/lib/card';
import { UserOutlined } from '@ant-design/icons';
import styles from './ScramMasterCard.module.scss';
import { useTypeSelector } from '../../redux/hooks/useTypeSelector';
import { useAction } from '../../redux/hooks/useAction';

const ScramMasterInfo = (): JSX.Element => {
  const masterInfo = useTypeSelector((state) => state.formCreateReducer);
  const { getMasterParams } = useAction();
  // const state: RootState = store.getState();
  useEffect(() => {
    getMasterParams();
  }, []);

  return (
    <Card title="Scram master:" style={{ width: '30%', height: '100%' }}>
      <div className={styles.main__scram_master_info}>
        {typeof masterInfo.master.avatarURL !== 'string' ||
        masterInfo.master.avatarURL === '' ? (
          <UserOutlined style={{ fontSize: '500%' }} />
        ) : (
          <div className={styles.main__scram_master__container_img}>
            <img
              className={styles.main__scram_master__img}
              src={masterInfo.master.avatarURL}
              alt="avatar"
            />
          </div>
        )}
        <div className={styles.main__scram_master_description}>
          <h3>{`${masterInfo.master.name} ${masterInfo.master.lastName}`}</h3>
          <p>{masterInfo.master.jobPosition}</p>
        </div>
      </div>
    </Card>
  );
};

export default ScramMasterInfo;
