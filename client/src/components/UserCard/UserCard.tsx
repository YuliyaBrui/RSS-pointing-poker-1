import { StopOutlined, UserOutlined } from '@ant-design/icons/lib/icons';
import Avatar from 'antd/lib/avatar/avatar';
import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Popconfirm from 'antd/lib/popconfirm';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { chatParams } from '../../redux/actions/chat';
import { IChatUsers } from '../../redux/types/chat';
import { socket } from '../../socket';
import styles from './UserCard.module.scss';

type IUsercard = {
  name: string;
  lastName: string;
  id: string;
  position: string;
  avatar: string | ArrayBuffer | null;
  visibil: 'visible' | 'hidden';
};

const UserCard = ({
  name,
  lastName,
  id,
  position,
  avatar,

  visibil = 'hidden',
}: IUsercard): JSX.Element => {
  const gameMaster = useSelector(
    (state: RootState) => state.chatReducer.users.master,
  );
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const kickUserData = useSelector((state: RootState) => state.kickUserData);
  const kickData = {
    visibil: true,
    initiator: { name: currentUser.name, lastName: currentUser.lastName },
    exclusion: { name, lastName, id },
    yes: [],
    no: [],
  };
  const dispatch = useDispatch();
  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
  const getUsers = ({ members, observers, master }: IChatUsers): void => {
    console.log({ members, observers, master });
    dispatch(chatParams({ members, observers, master }));
  };
  const sendKickData = (): void => {
    if (currentUser.id === gameMaster.id) {
      socket.emit('KICK_USER_BY_MASTER', gameID, id);
    } else {
      socket.emit('KICK_DATA', gameID, kickData);
    }
    socket.on('KICKED_MEMBER', getUsers);
    socket.on('STAY_MEMBER', getUsers);
  };

  const location = useLocation();

  return (
    <Card style={{ width: '260px', height: '80px', margin: '5px' }}>
      <div className={styles.main__user_info}>
        {avatar === '' ? (
          <UserOutlined style={{ fontSize: '300%', height: '50px' }} />
        ) : (
          <Avatar style={{ width: '50px', height: '50px' }} src={avatar} />
        )}
        <div className={styles.main__user_description}>
          <h3>{`${name} ${lastName}`}</h3>
          <p>{position}</p>
        </div>
        {(location.pathname === '/setting' || location.pathname === '/lobby') && (
          <Popconfirm
            title="Kick player?"
            okText="Yes"
            cancelText="No"
            onConfirm={sendKickData}
          >
            <StopOutlined
              style={{
                fontSize: '200%',
                margin: '1%',
                color: 'red',
                visibility: visibil,
              }}
            />
          </Popconfirm>
        )}
      </div>
    </Card>
  );
};

export default UserCard;
