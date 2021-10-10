import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import styles from './CurrentUser.module.scss';

export const CurrentUser = (): JSX.Element => {
 
  const currentUser = JSON.parse(sessionStorage.user);
 
  return (
    <div className={styles.user_wrapper}>
      {typeof currentUser.avatarURL !== 'string' ||
      currentUser.avatarURL === '' ? (
        <Avatar size={40} icon={<UserOutlined size={30} />} />
      ) : (
          <Avatar size={40} src={currentUser.avatarURL} />
        )}
      <p className = {styles.user_info}>{currentUser.name}</p>
    </div>
  );
};
