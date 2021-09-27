import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';
import { RootState } from '../../redux';
import { getUsersParams } from '../../redux/actions/createSession';
import { IFormGameValue } from '../../redux/types/forms';
import { socket } from '../../socket';
import styles from './Chat.module.scss';
import Message from './Message';

export const MessagesPlace = (): JSX.Element => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.chatReducer);
  useEffect(() => {
    dispatch(getUsersParams('1111'));
  }, []);

  return (
    <div className={styles.chat__messages}>
      <ScrollableFeed>
        {users.messages.map((m) => (
          <Message
            avatar={m.avatar}
            name={m.name}
            text={m.text}
            lastName={m.lastName}
          />
        ))}
      </ScrollableFeed>
    </div>
  );
};

export default MessagesPlace;
