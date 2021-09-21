import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { IMessage } from '../../redux/types/chat';
import styles from './Chat.module.scss';


export const Message = ({ avatar, name, text }: IMessage): JSX.Element => (
    <div className={styles.chat__message_wrapper}>
      <Avatar
        style={{ width: '40px', height: '40px', marginTop: '3px' }}
        src={avatar}
      />
      <div className={styles.chat__name_message}>
        <div className={styles.chat__name} style={{ margin: '0' }}>
          {name}
        </div>
        <div className={styles.chat__message_text}>{text}</div>
      </div>
    </div>
  );

export default Message;
