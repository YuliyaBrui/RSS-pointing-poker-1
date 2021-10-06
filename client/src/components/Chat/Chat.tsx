import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons/lib/icons';
import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { chatMessageParams, newMessageParams } from '../../redux/actions/chat';
import { IMessage } from '../../redux/types/chat';
import { socket } from '../../socket';
import styles from './Chat.module.scss';
import MessagesPlace from './MessagesPlace';
import SendingForm from './SendingForm';

const Chat = (): JSX.Element => {
  const dispatch = useDispatch();
  const addMessage = (message: IMessage[]): void => {
    dispatch(chatMessageParams(message));
  };
  const [collapsed, setCollapsed] = useState(false);
  const [dragState, setDragState] = useState({});
  const [offset, setOffset] = useState({ offsetX: 0, offsetY: 0 });
  const sizeHidingField = 270;

  const dragStart = (e: any): void => {
    setOffset({
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    });
  };

  const dragEnd = (e: any): void => {
    if (collapsed) {
      setDragState({
        top: `${e.clientY - sizeHidingField - offset.offsetY}px`,
        left: `${e.clientX - offset.offsetX}px`,
      });
    } else {
      setDragState({
        top: `${e.clientY - offset.offsetY}px`,
        left: `${e.clientX - offset.offsetX}px`,
      });
    }
  };

  useEffect(() => {
    socket.on('GAME_ADD_MESSAGE', addMessage);
  }, []);

  return (
    <div
      className={styles.chat__wrapper}
      onDragStart={(e) => dragStart(e)}
      onDragEnd={(e) => dragEnd(e)}
      draggable
      style={
        collapsed
          ? { height: '45px', marginTop: `${sizeHidingField}px`, ...dragState }
          : { ...dragState, cursor: 'grab' }
      }
    >
      <div className={styles.chat__header}>
        <h3 className={styles.chat__title}>Chat</h3>
        <Button
          type="default"
          className={styles.chat__collapsed}
          style={{
            border: 'none',
            padding: 0,
            height: '45px',
          }}
          htmlType="button"
        >
          {collapsed ? (
            <ArrowsAltOutlined
              style={{ fontSize: '150%' }}
              onClick={() => setCollapsed(false)}
            />
          ) : (
            <ShrinkOutlined
              style={{ fontSize: '150%' }}
              onClick={() => setCollapsed(true)}
            />
          )}
        </Button>
      </div>
      <div
        className={styles.chat__content}
        style={collapsed ? { height: 0 } : {}}
      >
        <MessagesPlace />
        <SendingForm />
      </div>
    </div>
  );
};

export default Chat;
