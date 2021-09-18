/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'antd/lib/card';
import { UserOutlined } from '@ant-design/icons';
import { RootState } from '../../redux';
import { getUsersParams } from '../../redux/actions/formCreateGame';
import styles from './ScramMasterCard.module.scss';

const ScramMasterInfo = (): JSX.Element => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.chatReducer);
  useEffect(() => {
    dispatch(getUsersParams('1111'));
  }, []);

  return (
    <Card title="Scram master:" style={{ width: '30%', height: '100%' }}>
      <div className={styles.main__scram_master_info}>
        {typeof users.users.master.avatarURL !== 'string' ||
        users.users.master.avatarURL === '' ? (
          <UserOutlined style={{ fontSize: '500%' }} />
        ) : (
          <div className={styles.main__scram_master__container_img}>
            <img
              className={styles.main__scram_master__img}
              src={users.users.master.avatarURL}
              alt="avatar"
            />
          </div>
        )}
        <div className={styles.main__scram_master_description}>
          <h3>{`${users.users.master.name} ${users.users.master.lastName}`}</h3>
          <p>{users.users.master.jobPosition}</p>
        </div>
      </div>
    </Card>
  );
};

export default ScramMasterInfo;
