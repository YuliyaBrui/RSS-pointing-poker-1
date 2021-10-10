/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'antd/lib/card';
import { UserOutlined } from '@ant-design/icons';
import { RootState } from '../../redux';
import { getUsersParams } from '../../redux/actions/createSession';
import styles from './ScramMasterCard.module.scss';

const ScramMasterInfo = (): JSX.Element => {
  const master = useSelector(
    (state: RootState) => state.chatReducer.users.master,
  );

  return (
    <Card title="Scram master:" className={styles.main__card}>
      <div className={styles.main__scram_master_info}>
        {typeof master.avatarURL !== 'string' || master.avatarURL === '' ? (
          <UserOutlined style={{ fontSize: '400%' }} />
        ) : (
          <div className={styles.main__scram_master__container_img}>
            <img
              className={styles.main__scram_master__img}
              src={master.avatarURL}
              alt="avatar"
            />
          </div>
        )}
        <div className={styles.main__scram_master_description}>
          <h3>{`${master.name} ${master.lastName}`}</h3>
          <p>{master.jobPosition}</p>
        </div>
      </div>
    </Card>
  );
};

export default ScramMasterInfo;
