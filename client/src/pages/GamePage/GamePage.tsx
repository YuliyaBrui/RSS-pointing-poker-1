/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import { Button, Row, Spin, Space, Carousel } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Col from 'antd/lib/grid/col';
import styles from './GamePage.module.scss';
import ScramMasterInfo from '../../components/ScramMasterCard/ScramMasterCard';
import Issue from '../../components/Issues/Issue';
import Timer from '../../components/Timer/Timer';
import IssueForm from '../../components/Issues/IssueForm';
import UserCard from '../../components/UserCard/UserCard';
import { RootState } from '../../redux';
import { gameIssues } from '../../redux/actions/chat';
import { IIssue } from '../../redux/types/issues';
import Statistics from '../../components/Statistics/Statistics';
import GameCard from '../../components/GameCard/GameCard';
import CoffeeGameCard from '../../components/GameCard/CoffeeGameCard';
import { IGameCard } from '../../redux/types/gameCard';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import Chat from '../../components/Chat/Chat';
import { socket } from '../../socket';
import { getUsersParams } from '../../redux/actions/createSession';

const GamePage = (): JSX.Element => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const [formVisible, setFormVisible] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const issues = useSelector((state: RootState) => state.chatReducer.issues);
  const gameCards = useSelector((state: RootState) => state.gameCards);
  const joinMember = useSelector((state: RootState) => state.chatReducer);
  const masters = useSelector(
    (state: RootState) => state.gameSetting.masterPlayer,
  );
  const timer = useSelector((state: RootState) => state.gameSetting.needTimer);
  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
  const dispatch = useDispatch();
  const handleSortASCClick = (): void => {
    socket.emit('SORT_ISSUES_ASC', gameID);
    dispatch(getUsersParams(gameID));
    console.log(issues);
  };
  const handleSortDESCClick = (): void => {
    socket.emit('SORT_ISSUES_DESC', gameID);
    dispatch(getUsersParams(gameID));
    console.log(issues);
  };

  console.log(masters);
  console.log(timer);


  const history = useHistory();
  const result = (): void => {
    history.push('/result');
  };

  const setUserPoint = (point: number): void => {
    socket.emit('SET_USER_POINT', gameID, { ...currentUser, point });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3002/session-name/${gameID}`)
      .then((res) => setSessionName(res.data));
  }, []);

  const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: 'black',
          fontSize: '25px',
          lineHeight: '1.5715',
        }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: 'black',
          fontSize: '25px',
          lineHeight: '1.5715',
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return sessionName.length > 1 ? (
    <div className={styles.wrapper}>
      <div className={styles.game}>
        <div className={styles.game__part_game}>
          <h1 className={styles.game_title}>{sessionName}</h1>
          <div className={styles.game_info}>
            <div className={styles.game_side}>
              <div>
                <ScramMasterInfo />
              </div>
              {timer && (
                <div>
                  <Timer />
                </div>
              )}
              <div>
                <div>
                  <Button
                    type="primary"
                    className={styles.button}
                    style={{ width: '100%' }}
                    onClick={() => {
                      result();
                      socket.emit('FINAL_VOITING_RESULT', gameID);
                    }}
                  >
                    Stop game
                  </Button>
                </div>
                <div>
                  <Button
                    type="primary"
                    className={styles.button}
                    style={{ width: '100%' }}
                  >
                    Next Issues
                  </Button>
                </div>
                <div>
                  <Button type="primary" style={{ width: '100%' }}>
                    Sort Issue
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.process}>
              <div className={styles.issue}>
                <Button
                  type="primary"
                  className={styles.button}
                  style={{ width: '100%' }}
                  onClick={handleSortASCClick}
                >
                  ASC
                </Button>
                <Button
                  type="primary"
                  className={styles.button}
                  style={{ width: '100%' }}
                  onClick={handleSortDESCClick}
                >
                  DESC
                </Button>
                <h2 className={styles.game_title}>Issues: </h2>
                <Carousel arrows {...settings}>
                  {issues &&
                    issues.map((issue: IIssue) => (
                      <div>
                        <h3
                          style={{
                            height: '130px',
                            color: '#fff',
                            lineHeight: '130px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Issue
                            title={issue.title}
                            priority={issue.priority}
                            link={issue.link}
                            id={issue.id}
                            key={issue.id}
                          />
                        </h3>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormVisible(true);
                    }}
                  >
                    <CreateIssue />
                  </button>
                </Carousel>
              </div>
              <div>
                <h2 className={styles.game_title}>Statistics:</h2>
                <Statistics />
              </div>
              {masters && (
                <div>
                  <Row style={{ width: '100%' }} justify="center">
                    <Button
                      type="default"
                      style={{ border: 'none', padding: '0', height: '100%' }}
                      onClick={() => setUserPoint(0)}
                    >
                      <CoffeeGameCard />
                    </Button>
                    {gameCards.map((gameCard: IGameCard) => (
                      <Button
                        type="default"
                        style={{ border: 'none', padding: '0', height: '100%' }}
                        onClick={() => setUserPoint(gameCard.cardValue)}
                      >
                        <GameCard
                          cardValue={gameCard.cardValue}
                          id={gameCard.id}
                          key={gameCard.id}
                        />
                      </Button>
                    ))}
                  </Row>
                </div>
              )}
            </div>
          </div>
          <IssueForm
            formVisible={formVisible}
            setFormVisible={setFormVisible}
          />
        </div>
        <div className={styles.game__part_score}>
          <div className={styles.score_title}>
            <h1>Score:</h1>
            <h1>Players:</h1>
          </div>
          <Col style={{ width: '100%' }}>
            {masters && (
              <div className={styles.score}>
                <div>
                  <ScoreCard />
                </div>
                <div>
                  <UserCard
                    name={joinMember.users.master.name}
                    lastName={joinMember.users.master.lastName}
                    avatar={joinMember.users.master.avatarURL}
                    position={joinMember.users.master.jobPosition}
                    visibil="visible"
                    key={joinMember.users.master.name}
                    id={joinMember.users.master.id}
                  />
                </div>
              </div>
            )}
            {joinMember.users.members &&
              joinMember.users.members.map((user) => (
                <div className={styles.score}>
                  <div>
                    <ScoreCard />
                  </div>
                  <div>
                    <UserCard
                      name={user.name}
                      lastName={user.lastName}
                      avatar={user.avatarURL}
                      position={user.jobPosition}
                      visibil="visible"
                      id={user.id}
                      key={user.name}
                    />
                  </div>
                </div>
              ))}
          </Col>
        </div>
      </div>
      <Chat />
    </div>
  ) : (
    <div className={styles.wrapper}>
      <Space size="large">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default GamePage;
