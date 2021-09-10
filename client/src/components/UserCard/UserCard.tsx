import { StopOutlined } from '@ant-design/icons/lib/icons';
import Avatar from 'antd/lib/avatar/avatar';
import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Popconfirm from 'antd/lib/popconfirm';
import React from 'react';
import styles from './UserCard.module.scss';

type IUsercard = {
  name: string;
  position: string;
  avatar: string;
  visibility: 'visible' | 'hidden';
};

const UserCard = ({
  name,
  position,
  avatar,
  visibility = 'hidden',
}: IUsercard): JSX.Element => {
  const asd = 123;
  return (
    <Card style={{ width: '280px', height: '100%', margin: '5px' }}>
      <div className={styles.main__user_info}>
        <Avatar style={{ width: '50px', height: '50px' }} src={avatar} />
        <div className={styles.main__user_description}>
          <h3>{name}</h3>
          <p>{position}</p>
        </div>
        <Popconfirm title="Kick player?" okText="Yes" cancelText="No">
          <StopOutlined
            style={{ fontSize: '200%', margin: '1%', color: 'red' }}
          />
        </Popconfirm>
      </div>
    </Card>
  );
};

export default UserCard;
