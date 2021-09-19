import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';
import { RootState } from '../../redux';
import { getUsersParams } from '../../redux/actions/createSession';
import styles from './Chat.module.scss';
import Message from './Message';

// export const ws = new WebSocket('asd');

export const MessagesPlace = (): JSX.Element => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.chatReducer);
  useEffect(() => {
    dispatch(getUsersParams('1111'));
  }, []);

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
          {users.messages.map((m) => (
            <Message avatar={m.avatar} name={m.name} message={m.text} />
          ))}
        </ScrollableFeed>
      </div>
    </>
  );
};

export default MessagesPlace;
