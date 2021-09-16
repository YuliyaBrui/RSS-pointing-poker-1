import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import styles from './Chat.module.scss';
import Message from './Message';

// export const ws = new WebSocket('asd');

export const MessagesPlace = (): JSX.Element => {
  const messages = [
    {
      avatar: 'asd',
      name: 'Keanu Reeves',
      message:
        "Hello everyone What's up? What are we going to discuss today? I have a lot of cool ideas about our project!",
    },
    { avatar: 'asd', name: 'Tom Cruise', message: 'Hi, im greate!' },
    { avatar: 'asd', name: 'asd', message: 'asd' },
  ];

  return (
    <>
      <div className={styles.chat__messages}>
        <ScrollableFeed>
          {messages.map((m) => (
            <Message avatar={m.avatar} name={m.name} message={m.message} />
          ))}
        </ScrollableFeed>
      </div>
    </>
  );
};

export default MessagesPlace;
