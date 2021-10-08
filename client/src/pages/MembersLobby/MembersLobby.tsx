import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import { Content } from 'antd/lib/layout/layout';
import Row from 'antd/lib/row';
import Space from 'antd/lib/space';
import Spin from 'antd/lib/spin';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Chat from '../../components/Chat/Chat';
import KickMemberForm from '../../components/KickMemberForm/KickMemberForm';
import ScramMasterCard from '../../components/ScramMasterCard/ScramMasterCard';
import UserCard from '../../components/UserCard/UserCard';
import { RootState } from '../../redux';
import { chatParams, sessionNameParams } from '../../redux/actions/chat';
import { getUsersParams } from '../../redux/actions/createSession';
import { IChatUsers } from '../../redux/types/chat';
import { SERVER_URL, socket } from '../../socket';
import styles from './MembersLobby.module.scss';

const MembersLobby = (): JSX.Element => {
  const [formVisible, setFormVisible] = useState(false);

 // const [sessionName, setSessionName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const getUsers = ({ members, observers, master }: IChatUsers): void => {
    dispatch(chatParams({ members, observers, master }));
  };
  const sessionName = useSelector(
    (state: RootState) => state.chatReducer.sessionName,
  );
  const members = useSelector(
    (state: RootState) => state.chatReducer.users.members,
  );
  const observers = useSelector(
    (state: RootState) => state.chatReducer.users.observers,
  );
  
 /* const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
*/
  const { gameID } = sessionStorage;
 
  const currentUser = JSON.parse(sessionStorage.user);
  useEffect(() => {
    socket.on('MEMBER_JOINED', getUsers);
    dispatch(getUsersParams(gameID));
   socket.on('GET_SESSION_NAME', (name) => {
      dispatch(sessionNameParams(name));
    });
   /* axios
      .get(`${SERVER_URL}/session-name/${gameID}`)
      .then((res) => setSessionName(res.data));*/
  }, []);
  const handleExitClick = (): void => {
    socket.emit('USER_EXIT', gameID, socket.id);
};
  window.onload = () => {
    const joinState = {
      user: {
        name: currentUser.name,
        lastName: currentUser.lastName,
        jobPosition: currentUser.jobPosition,
        avatarURL: currentUser.avatarURL,
        id: socket.id,
      },
      gameID,
    };
    if (currentUser.role === 'member') {
      socket.emit('GAME_JOIN_MEMBER', joinState);
     
    }
    if (currentUser.role === 'observer') {
      socket.emit('GAME_JOIN_OBSERVER', joinState);
    
    }
    dispatch(getUsersParams(gameID));
  };
  socket.on('MEMBER_LEAVED', getUsers);
  // const currentUser = useSelector((state: RootState) => state.currentUser);

  return sessionName.length > 0 ? (
    <Content className={styles.wrapper}>
      <div className={styles.lobby}>
        <div className={styles.lobby__panel}>
          <div className={styles.lobby__content_wrapper}>
            <ScramMasterCard />
            <div className={styles.lobby__text_wrapper}>
              <h2 className={styles.lobby__waiting}>
                Wait for the session to start...
              </h2>
              <h2>or</h2>
              <Button type="primary" onClick={handleExitClick}>
                Exit
              </Button>
            </div>
            <Card
              title="Session name:"
              style={{ width: '30%', height: '100%' }}
            >
              {sessionName}
            </Card>
          </div>
        </div>
        <div className={styles.lobby__panel}>
          <h3>Members:</h3>
          <Row style={{ width: '100%' }} justify="start">
            {currentUser.role === 'observer' || members.length < 3
              ? members.map((user) => (
                  <UserCard
                  id={user.id}
                  name={user.name}
                  lastName={user.lastName}
                  avatar={user.avatarURL}
                  position={user.jobPosition}
                  visibil="hidden"
                  key={user.name}
                />
                ))
              : members.map((user) => (
                  <UserCard
                  id={user.id}
                  name={user.name}
                  lastName={user.lastName}
                  avatar={user.avatarURL}
                  position={user.jobPosition}
                  visibil={
                      socket.id === `"${user.id}"` || currentUser.id === user.id
                        ? 'hidden'
                        : 'visible'
                    }
                  key={user.name}
                />
                ))}
          </Row>
        </div>
        <div className={styles.lobby__panel}>
          <h3>Observers:</h3>
          <Row style={{ width: '100%' }} justify="start">
            {currentUser.role === 'observer' || members.length < 3
              ? observers.map((user) => (
                <UserCard
                    id={user.id}
                    name={user.name}
                    lastName={user.lastName}
                    avatar={user.avatarURL}
                    position={user.jobPosition}
                    visibil="hidden"
                    key={user.name}
                  />
              ))
              : observers.map((user) => (
                <UserCard
                    id={user.id}
                    name={user.name}
                    lastName={user.lastName}
                    avatar={user.avatarURL}
                    position={user.jobPosition}
                    visibil={
                     'visible'
                    }
                    key={user.name}
                  />
              ))}
          </Row>
        </div>
      </div>
      <Chat />
      <KickMemberForm formVisible={formVisible} />
    </Content>
  ) : (
    <div className={styles.wrapper}>
      <Space size="large">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default MembersLobby;
