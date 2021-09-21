import Button from 'antd/lib/button/button';
import Input from 'antd/lib/input/Input';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { newMessageParams, userParams } from '../../redux/actions/chat';
import { IFormGameValue } from '../../redux/types/forms';
import { socket } from '../../socket';
import styles from './Chat.module.scss';

export const SendingForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const user = useSelector((state: RootState) => state.chatReducer);
  const sendMessage = (): void => {
     
    const newMessage = {
      text: message,
      avatar: user.user.avatarURL,
      name: user.user.name,
      gameID: '1111',
    };
    socket.emit('GAME_NEW_MESSAGE', newMessage);
    dispatch(newMessageParams(newMessage));
    setMessage('');
  };
  return (
    <>
      <div className={styles.chat__add_messages}>
        <Input
          onChange={(e) => setMessage(e.target.value)}
          required
          value={message}
          style={{ height: '47px' }}
        />
        <Button type="primary" htmlType="submit" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </>
  );
};

export default SendingForm;
