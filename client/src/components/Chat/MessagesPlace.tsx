import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';
import { RootState } from '../../redux';
import styles from './Chat.module.scss';
import Message from './Message';

// export const ws = new WebSocket('asd');

export const MessagesPlace = (): JSX.Element => {
  const messages = useSelector(
    (state: RootState) => state.chatReducer.messages,
  );

  return (
    <>
      <div className={styles.chat__messages}>
        <ScrollableFeed>
          {messages.map((m) => (
            <Message
              avatar={m?.avatar}
              name={m?.name}
              text={m.text}
              lastName={m?.lastName}
            />
          ))}
        </ScrollableFeed>
      </div>
    </>
  );
};

export default MessagesPlace;
