import Card from 'antd/lib/card';
import { Content } from 'antd/lib/layout/layout';
import Row from 'antd/lib/row';
import React, { useState } from 'react';
import Chat from '../../components/Chat/Chat';
import KickMemberForm from '../../components/KickMemberForm/KickMemberForm';
import ScramMasterCard from '../../components/ScramMasterCard/ScramMasterCard';
import UserCard from '../../components/UserCard/UserCard';
import styles from './MembersLobby.module.scss';

const MembersLobby = (): JSX.Element => {
  const [formVisible, setFormVisible] = useState(false);

  const users = [
    {
      name: 'Keanu Reeves',
      position: 'JS-developer',
      avatar:
        'https://avatars.mds.yandex.net/get-pdb/2846431/30e3043d-7e95-4653-bca7-5bb61219df86/s1200?webp=false',
    },
    {
      name: 'Tom Cruise',
      position: 'Backend-developer',
      avatar:
        'https://avatars.mds.yandex.net/get-zen_doc/1245815/pub_5bc9d59d3491a600a9655d81_5bc9d9229989ff00ae413c2a/scale_1200',
    },
  ];

  return (
    <Content className={styles.wrapper}>
      <div className={styles.lobby}>
        <div className={styles.lobby__panel}>
          <div className={styles.lobby__content_wrapper}>
            <ScramMasterCard />
            <h2 className={styles.lobby__waiting}>
              Waiting for the session to start...
            </h2>
            <Card
              title="Session name:"
              style={{ width: '30%', height: '100%' }}
            >
              Session name
            </Card>
          </div>
        </div>
        <div className={styles.lobby__panel}>
          <h3>Members:</h3>
          <Row style={{ width: '100%' }} justify="start">
            {users.map((user) => (
              <UserCard
                name={user.name}
                avatar={user.avatar}
                position={user.position}
                visibil="visible"
                key={user.name}
              />
            ))}
          </Row>
        </div>
      </div>
      <Chat />
      <KickMemberForm
        formVisible={formVisible}
        setFormVisible={() => console.log('asd')}
      />
    </Content>
  );
};

export default MembersLobby;
