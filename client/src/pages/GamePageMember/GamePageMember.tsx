/* eslint-disable operator-linebreak */
import React, { RefObject, useEffect, useState } from 'react';
import {
 Button, Carousel, Space, Spin 
} from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import styles from './GamePageMember.module.scss';
import ScramMasterInfo from '../../components/ScramMasterCard/ScramMasterCard';
import Issue from '../../components/Issues/Issue';
import Timer from '../../components/Timer/Timer';
import IssueForm from '../../components/Issues/IssueForm';
import UserCard from '../../components/UserCard/UserCard';
import GameCard from '../../components/GameCard/GameCard';
import CoffeeGameCard from '../../components/GameCard/CoffeeGameCard';
import { RootState } from '../../redux';
import { IIssue } from '../../redux/types/issues';
import { IGameCard } from '../../redux/types/gameCard';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import { SERVER_URL, socket } from '../../socket';
import { getUsersParams } from '../../redux/actions/createSession';
import Chat from '../../components/Chat/Chat';
import { gameIssues } from '../../redux/actions/chat';

type IGameScore = {
  name: string;
  lastName: string;
  jobPosition: string;
  avatarURL: string;
  id: string;
  point: number;
};

const GamePageMember = (): JSX.Element => {
  const [sessionName, setSessionName] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentIssue, setCurrentIssue] = useState(0);
  const [vivsibGameScore, setVivsibGameScore] = useState(false);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(sessionStorage.user);
  const issues = useSelector((state: RootState) => state.chatReducer.issues);
  const gameCards = useSelector(
    (state: RootState) => state.chatReducer.gameCards,
  );

  const [gameScore, setGameScore] = useState([]);
  const timer = useSelector(
    (state: RootState) => state.chatReducer.setting.needTimer,
  );

  const [visibilCard, setVisibilCard] = useState<number[]>([]);

 /* const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
*/
  const { gameID } = sessionStorage;
  const history = useHistory();
  const carouselRef: RefObject<any> = React.createRef();
  const exit = (): void => {
    history.push('/');
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

  const promese = (data: number): Promise<boolean> =>
    new Promise((res, req) => {
    setCurrentIssue(data);
    res(true);
  });

  const getIssues = (issuesGame: IIssue[]): void => {
    dispatch(gameIssues(issuesGame));
  };
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/session-name/${gameID}`)
      .then((res) => setSessionName(res.data));
    // dispatch(setRoundTime());
    socket.on('GET_USER_POINT', (data) => setGameScore(data));
    socket.on('RESET_VISIBIL_CARD', (data) => changeVisibilCard(data));
    socket.on('GAME_SORT_ISSUES', getIssues);
    socket.on('ROUND_RUN', () => {
      changeVisibilCard(-1);
      setIsRunning(true);
    });
    socket.on('NEXT_CURRENT_ISSUE', (data) => {
      promese(data).then(carouselRef.current.goTo(currentIssue + 1));
      console.log(currentIssue);
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
              {timer && (
                <div>
                  <Timer
                    running={setIsRunning}
                    changeVisibil={changeVisibilCard}
                  />
                </div>
              )}
              <div>
                <Button type="primary" className={styles.button} onClick={exit}>
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
                      <div className={styles.issues_wrapper}>
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
                    {gameCards.map((gameCard: IGameCard, i: number) => (
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
                    ))}
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.game__part_score}>
          <div className={styles.score_title}>
            <h1>Score:</h1>
            <h1>Players:</h1>
          </div>
          <Col style={{ width: '100%' }}>
            {gameScore.length > 0 ? (
              gameScore.map((user: IGameScore) => (
                <div className={styles.score}>
                  <div>
                    <ScoreCard visibil={vivsibGameScore} point={user.point} />
                  </div>
                  <div>
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

export default GamePageMember;
