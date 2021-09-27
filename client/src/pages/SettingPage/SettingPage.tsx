/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import Row from 'antd/lib/grid/row';
import Space from 'antd/lib/space';
import Spin from 'antd/lib/spin';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SettingPage.module.scss';
import SessionInfo from '../../components/SettingPagePart/SessionInfo/SessionInfo';
import StartCancelButtons from '../../components/SettingPagePart/StartCancelButton/StartCancelButton';
import UserCard from '../../components/UserCard/UserCard';
import Issue from '../../components/Issues/Issue';
import CreateIssue from '../../components/Issues/CreateIssueButton';
import IssueForm from '../../components/Issues/IssueForm';
import GameSetting from '../../components/SettingPagePart/GameSetting/GameSetting';
import CreateGameCard from '../../components/GameCard/CreateGameCard';
import GameCard from '../../components/GameCard/GameCard';
import CoffeeGameCard from '../../components/GameCard/CoffeeGameCard';
import { RootState } from '../../redux';
import { IIssue } from '../../redux/types/issues';
import { addGameCards } from '../../redux/actions/gameCards';
import { IGameCard } from '../../redux/types/gameCard';
import Chat from '../../components/Chat/Chat';
import { socket } from '../../socket';
import { IChatUsers } from '../../redux/types/chat';
import { getUsersParams } from '../../redux/actions/createSession';
import { chatParams, newMessageParams } from '../../redux/actions/chat';
import KickMemberForm from '../../components/KickMemberForm/KickMemberForm';

const SettingPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const getUsers = ({ members, observers, master }: IChatUsers): void => {
    dispatch(chatParams({ members, observers, master }));
  };
  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
  useEffect(() => {
    socket.on('MEMBER_JOINED', getUsers);
    socket.on('MEMBER_LEAVED', getUsers);
    socket.on('GAME_NEW_MESSAGE', (message) => {
      dispatch(newMessageParams(message));
    });
    dispatch(getUsersParams(gameID));
  }, []);

  const joinMember = useSelector((state: RootState) => state.chatReducer);
  const issues = useSelector((state: RootState) => state.chatReducer);
  const gameCards = useSelector((state: RootState) => state.gameCards);
  const [formVisible, setFormVisible] = useState(false);
  const masterName = useSelector(
    (state: RootState) => state.chatReducer.users.master.name,
  );

  const nextCardValue = (): IGameCard => {
    const cardValue =
      gameCards[gameCards.length - 1].cardValue +
      gameCards[gameCards.length - 2].cardValue;
    return { cardValue, id: cardValue };
  };

  return masterName.length > 1 ? (
    <Content className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.main__panel}>
          <SessionInfo />
          <StartCancelButtons />
        </div>
        <div className={styles.main__panel}>
          <h3>Members:</h3>
          <Row style={{ width: '100%' }} justify="start">
            {joinMember.users.members &&
              joinMember.users.members.map((user) => (
                <UserCard
                  id={user.id}
                  name={user.name}
                  lastName={user.lastName}
                  avatar={user.avatarURL}
                  position={user.jobPosition}
                  visibil="visible"
                  key={user.name}
                />
              ))}
          </Row>
        </div>
        <div className={styles.main__panel}>
          <h3>Observers:</h3>
          <Row style={{ width: '100%' }} justify="start">
            {joinMember.users.observers &&
              joinMember.users.observers.map((user) => (
                <UserCard
                  id={user.id}
                  name={user.name}
                  lastName={user.lastName}
                  avatar={user.avatarURL}
                  position={user.jobPosition}
                  visibil="visible"
                  key={user.name}
                />
              ))}
          </Row>
        </div>
        <div className={styles.main__panel}>
          <h3>Issues:</h3>
          <Row style={{ width: '100%' }} justify="start">
            {issues &&
              issues.issues.map((issue: IIssue) => (
                <Issue
                  title={issue.title}
                  priority={issue.priority}
                  link={issue.link}
                  id={issue.id}
                  key={issue.id}
                />
              ))}
            <button
              className={styles.main__button_invis}
              type="button"
              onClick={() => {
                setFormVisible(true);
              }}
            >
              <CreateIssue />
            </button>
          </Row>
        </div>
        <div className={styles.main__panel}>
          <h3>Game setting:</h3>
          <GameSetting />
        </div>
        <div className={styles.main__panel}>
          <h3>Add card values:</h3>
          <Row style={{ width: '100%' }} justify="start">
            <CoffeeGameCard />
            {gameCards.map((gameCard: IGameCard) => (
              <GameCard
                cardValue={gameCard.cardValue}
                id={gameCard.id}
                key={gameCard.id}
              />
            ))}
            <button
              className={styles.main__button_invis}
              type="button"
              onClick={() => dispatch(addGameCards(nextCardValue()))}
            >
              <CreateGameCard />
            </button>
          </Row>
        </div>
      </div>
      <IssueForm formVisible={formVisible} setFormVisible={setFormVisible} />
      <Chat />
      <KickMemberForm
        formVisible={formVisible}
        setFormVisible={() => console.log('asd')}
      />
    </Content>
  ) : (
    <div className={styles.wrapper}>
      <Space size="large">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default SettingPage;
