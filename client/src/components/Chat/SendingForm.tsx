import Button from 'antd/lib/button/button';
import Input from 'antd/lib/input/Input';
import React, { useState } from 'react';
import styles from './Chat.module.scss';

export const SendingForm = (): JSX.Element => {
  const [message, setMessage] = useState('');
 // const socket = new WebSocket('ws://localhost:3002/');
  const sendMessage = (): void => {
  /*  socket.send(
      JSON.stringify({
        method:''
        type: 'message',
        message: { message },
      }),
    );*/
    setMessage('');
  };
  return (
    <>
      <div className={styles.chat__add_messages}>
        <Input
          onChange={(e) => setMessage(e.target.value)}
          required
          value={message}
        />
        <Button type="primary" htmlType="submit" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </>
  );
};

export default SendingForm;
