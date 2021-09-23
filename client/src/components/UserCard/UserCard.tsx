import { StopOutlined, UserOutlined } from '@ant-design/icons/lib/icons';
import Avatar from 'antd/lib/avatar/avatar';
import Card from 'antd/lib/card';
import Popconfirm from 'antd/lib/popconfirm';
import React from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../socket';
import { RootState } from '../../redux';
import styles from './UserCard.module.scss';

type IUsercard = {
  name: string;
  lastName: string;
  position: string;
  avatar: string | ArrayBuffer | null;
  visibil: 'visible' | 'hidden';
};

const UserCard = ({
  name,
  lastName,
  position,
  avatar,
  visibil = 'hidden',
}: IUsercard): JSX.Element => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const kickData = {
    visibil: true,
    initiator: { name: currentUser.name, lastName: currentUser.lastName },
    exclusion: { name, lastName },
  };
  const sendKickData = (): void => {
    socket.emit('KICK_DATA', '1111', kickData);
  };

  return (
    <Card style={{ width: '260px', height: '80px', margin: '5px' }}>
      <div className={styles.main__user_info}>
        {avatar === '' ? (
          <UserOutlined style={{ fontSize: '300%', height: '50px' }} />
        ) : (
          <Avatar style={{ width: '50px', height: '80px' }} src={avatar} />
        )}
        <div className={styles.main__user_description}>
          <h3>{`${name} ${lastName}`}</h3>
          <p>{position}</p>
        </div>
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
      </div>
    </Card>
  );
};

export default UserCard;
