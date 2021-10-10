/* eslint-disable operator-linebreak */
import React, { RefObject, useEffect, useState } from 'react';
import { Button, Carousel, Space, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import styles from './GamePageMember.module.scss';
import ScramMasterInfo from '../../components/ScramMasterCard/ScramMasterCard';
import Issue from '../../components/Issues/Issue';
import Timer from '../../components/Timer/Timer';
import UserCard from '../../components/UserCard/UserCard';
import GameCard from '../../components/GameCard/GameCard';
import CoffeeGameCard from '../../components/GameCard/CoffeeGameCard';
import { RootState } from '../../redux';
import { IIssue } from '../../redux/types/issues';
import { IGameCard } from '../../redux/types/gameCard';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import { socket } from '../../socket';
import { getUsersParams } from '../../redux/actions/createSession';
import Chat from '../../components/Chat/Chat';
import AverageScoreForm from '../GamePage/AverageScoreForm';

type IGameScore = {
  name: string;
  lastName: string;
  jobPosition: string;
  avatarURL: string;
  id: string;
  point: number;
};

const GamePageMember = (): JSX.Element => {
  const [alertResultGame, setAlertResultGame] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentIssue, setCurrentIssue] = useState(0);
  const [vivsibGameScore, setVivsibGameScore] = useState(false);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(sessionStorage.user);
  const issues = useSelector((state: RootState) => state.chatReducer.issues);
  const gameCards = useSelector(
    (state: RootState) => state.chatReducer.gameCards,
  );
  const sessionName = useSelector(
    (state: RootState) => state.chatReducer.sessionName,
  );
  const [gameScore, setGameScore] = useState([]);
  const timer = useSelector(
    (state: RootState) => state.chatReducer.setting.needTimer,
  );
  const masterAsPlayer = useSelector(
    (state: RootState) => state.chatReducer.setting.masterPlayer,
  );
  const players = useSelector(
    (state: RootState) => state.chatReducer.users.members,
  );

  const masterInfo = useSelector(
    (state: RootState) => state.chatReducer.users.master,
  );

  const [visibilCard, setVisibilCard] = useState<number[]>([]);

  const { gameID } = sessionStorage;
  const carouselRef: RefObject<any> = React.createRef();
  const handleExitClick = (): void => {
    socket.emit('USER_EXIT', gameID, socket.id);
  };

  const setUserPoint = (point: number): void => {
    socket.emit('SET_USER_POINT', gameID, { ...currentUser, point });
  };

  const changeVisibilCard = (index: number): void => {
    const visivArr = [];
    for (let k = 0; k < gameCards.length + 1; k += 1) {
      visivArr.push(1);
    }

    if (index !== -1) visivArr.splice(index, 1, 0.3);
    setVisibilCard(visivArr);
  };

  const promese = (data: number): Promise<boolean> => new Promise((res, req) => {
      setCurrentIssue(data);
      res(true);
    });

  useEffect(() => {
    socket.on('GET_USER_POINT', (data) => setGameScore(data));
    socket.on('VIEW_ROUND_RESULT', (data) => {
      setGameScore(data);
      setAlertResultGame(true);
    });
    socket.on('RESET_VISIBIL_CARD', (data) => changeVisibilCard(data));
    socket.on('ROUND_RUN', () => {
      changeVisibilCard(-1);
      setIsRunning(true);
    });
    socket.on('NEXT_CURRENT_ISSUE', (data) => {
      promese(data);
    });
    socket.on('VIEW_GAME_SCORE', (data) => setVivsibGameScore(data));
    socket.emit('GET_GAME_CARDS', gameID);
  }, [gameScore, gameCards, carouselRef, currentIssue]);

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
  const SampleNextArrow = (props: any): JSX.Element => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: 'black',
          fontSize: '40px',
          width: '40px',
          height: '40px',
        }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props: any): JSX.Element => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: 'black',
          fontSize: '40px',
          width: '40px',
          height: '40px',
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
              <div className={styles.timer_wrapper}>
                {timer && (
                  <Timer
                    running={setIsRunning}
                    changeVisibil={changeVisibilCard}
                  />
                )}

                <Button
                  type="primary"
                  className={styles.button}
                  onClick={handleExitClick}
                >
                  EXIT
                </Button>
              </div>
            </div>
            <div className={styles.process}>
              <div className={styles.issue}>
                <h2 className={styles.game_title}>Issues: </h2>
                <Carousel
                  arrows
                  ref={carouselRef}
                  {...settings}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  {issues &&
                    issues.map((issue: IIssue, i) => (
                      <div className={styles.issues_wrapper} key={issue.id}>
                        <div
                          style={{
                            height: '150px',
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
                          <div
                            className={
                              currentIssue === i
                                ? styles.currnt_issues
                                : styles.none
                            }
                          >
                            The issue under discussion!
                          </div>
                        </div>
                      </div>
                    ))}
                </Carousel>
              </div>
              <div>
                <div className={styles.process}>
                  <Row style={{ width: '100%' }} justify="center">
                    {currentUser.role === 'member' ? (
                      <div className={styles.card_button_wrapper}>
                        <button
                          type="button"
                          disabled={timer ? !isRunning : false}
                          style={{
                            border: 'none',
                            padding: '0',
                            height: '100%',
                            background: 'none',
                            zIndex: visibilCard[0],
                            margin: '-5px',
                          }}
                          onClick={() => {
                            setUserPoint(0);
                            changeVisibilCard(0);
                          }}
                        >
                          <CoffeeGameCard />
                        </button>
                      </div>
                    ) : (
                      <div />
                    )}
                    {currentUser.role === 'member' ? (
                      gameCards.map((gameCard: IGameCard, i: number) => (
                        <div
                          className={styles.card_button_wrapper}
                          key={gameCard.id}
                        >
                          <button
                            type="button"
                            disabled={timer ? !isRunning : false}
                            style={{
                              border: 'none',
                              opacity: visibilCard[i + 1],
                              background: 'none',
                              padding: 0,
                              height: '100%',
                              margin: '-5px',
                            }}
                            onClick={() => {
                              setUserPoint(gameCard.cardValue);
                              changeVisibilCard(i + 1);
                            }}
                          >
                            <GameCard
                              cardValue={gameCard.cardValue}
                              id={gameCard.id}
                              key={gameCard.id}
                            />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div />
                    )}
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.game__part_score}>
          <div className={styles.game_score}>
            <div className={styles.score_title}>
              <h2>Score:</h2>
              <h2>Players:</h2>
            </div>
            <Col style={{ width: '100%' }}>
              {gameScore.length > 0 ? (
                gameScore.map((user: IGameScore) => (
                  <div className={styles.score} key={user.id}>
                    <div className={styles.scorecard}>
                      <ScoreCard visibil={vivsibGameScore} point={user.point} />
                    </div>
                    <div className={styles.usercard}>
                      <UserCard
                        name={user.name}
                        lastName={user.lastName}
                        avatar={user.avatarURL}
                        position={user.jobPosition}
                        visibil="visible"
                        id={user.id}
                        key={user.id}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center' }}>
                  Waiting for the votes of the players...
                </p>
              )}
            </Col>
          </div>
          <div className={styles.players}>
            <h2 style={{ textAlign: 'center' }}>
              Participating in the voting:
            </h2>
            {masterAsPlayer && (
              <div className={styles.usercard}>
                <UserCard
                  name={masterInfo.name}
                  lastName={masterInfo.lastName}
                  avatar={masterInfo.avatarURL}
                  position={masterInfo.jobPosition}
                  visibil="visible"
                  id={masterInfo.id}
                  key={masterInfo.id}
                />
              </div>
            )}
            {players.map((user) => (
              <div className={styles.usercard} key={user.id}>
                <UserCard
                  name={user.name}
                  lastName={user.lastName}
                  avatar={user.avatarURL}
                  position={user.jobPosition}
                  visibil="visible"
                  id={user.id}
                  key={user.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Chat />
      {alertResultGame && (
        <div style={{ position: 'fixed', zIndex: 2 }}>
          <AverageScoreForm
            alertResultGame
            resultFormVisib={setAlertResultGame}
          />
        </div>
      )}
    </div>
  ) : (
    <div className={styles.wrapper}>
      <Space size="large">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default GamePageMember;
