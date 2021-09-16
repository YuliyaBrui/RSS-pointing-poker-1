import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import styles from './Chat.module.scss';

type IMessage = {
  avatar: string;
  name: string;
  message: string;
};

export const Message = ({ avatar, name, message }: IMessage): JSX.Element => {
  const messages = 123;
  return (
    <div className={styles.chat__message_wrapper}>
      <Avatar
        style={{ width: '40px', height: '40px', marginTop: '3px' }}
        src={avatar}
      />
      <div className={styles.chat__name_message}>
        <div className={styles.chat__name} style={{ margin: '0' }}>
          {name}
        </div>
        <div className={styles.chat__message_text}>{message}</div>
      </div>
    </div>
  );
};

export default Message;
