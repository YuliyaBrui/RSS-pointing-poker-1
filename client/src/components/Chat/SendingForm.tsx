import Button from 'antd/lib/button/button';
import Input from 'antd/lib/input/Input';
import React, { useState } from 'react';
import styles from './Chat.module.scss';

export const SendingForm = (): JSX.Element => {
  const [message, setMessage] = useState('');

  // const sendMessage = () => {
  //   ws.send(,essage);
  //   setMessage('');
  // }

  return (
    <>
      <div className={styles.chat__add_messages}>
        <Input
          onChange={(e) => setMessage(e.target.value)}
          required
          value={message}
        />
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </div>
    </>
  );
};

export default SendingForm;
