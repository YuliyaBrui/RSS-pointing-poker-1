import Card from 'antd/lib/card';
import { Content } from 'antd/lib/layout/layout';
import Row from 'antd/lib/row';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '../../components/Chat/Chat';
import KickMemberForm from '../../components/KickMemberForm/KickMemberForm';
import ScramMasterCard from '../../components/ScramMasterCard/ScramMasterCard';
import UserCard from '../../components/UserCard/UserCard';
import { RootState } from '../../redux';
import { chatParams } from '../../redux/actions/chat';
import { getUsersParams } from '../../redux/actions/createSession';
import { kickForm } from '../../redux/actions/kickForm';
import { IChatState, IChatUsers } from '../../redux/types/chat';
import { socket } from '../../socket';
import styles from './MembersLobby.module.scss';

const MembersLobby = (): JSX.Element => {
  const [formVisible, setFormVisible] = useState(false);
  const dispatch = useDispatch();
  const getUsers = ({ members, observers, master }: IChatUsers): void => {
    dispatch(chatParams({ members, observers, master }));
  };
  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
  useEffect(() => {
    socket.on('MEMBER_JOINED', getUsers);
    dispatch(getUsersParams(gameID));
  }, []);

  socket.on('MEMBER_LEAVED', getUsers);
  const members = useSelector(
    (state: RootState) => state.chatReducer.users.members,
  );
  const currentUser = useSelector((state: RootState) => state.currentUser);

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
            {members.map((user) => (
              <UserCard
                id={user.id}
                name={user.name}
                lastName={user.lastName}
                avatar={user.avatarURL}
                position={user.jobPosition}
                visibil={currentUser.id === user.id ? 'hidden' : 'visible'}
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
