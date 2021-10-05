/* eslint-disable operator-linebreak */
import React, { RefObject, useEffect, useState } from 'react';
import {
 Button, Row, Spin, Space, Carousel, Select 
} from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Col from 'antd/lib/grid/col';
import FormItem from 'antd/lib/form/FormItem';
import styles from './GamePage.module.scss';
import ScramMasterInfo from '../../components/ScramMasterCard/ScramMasterCard';
import Issue from '../../components/Issues/Issue';
import Timer from '../../components/Timer/Timer';
import IssueForm from '../../components/Issues/IssueForm';
import UserCard from '../../components/UserCard/UserCard';
import { RootState } from '../../redux';
import { IIssue } from '../../redux/types/issues';
import GameCard from '../../components/GameCard/GameCard';
import CoffeeGameCard from '../../components/GameCard/CoffeeGameCard';
import { IGameCard } from '../../redux/types/gameCard';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import Chat from '../../components/Chat/Chat';
import { SERVER_URL, socket } from '../../socket';
import { getUsersParams } from '../../redux/actions/createSession';
import CreateIssue from '../../components/Issues/CreateIssueButton';
import AverageScoreForm from './AverageScoreForm';

type IGameScore = {
  name: string;
  lastName: string;
  jobPosition: string;
  avatarURL: string;
  id: string;
  point: number;
};

const GamePage = (): JSX.Element => {
  // const currentUser = useSelector((state: RootState) => state.currentUser);
  const currentUser = JSON.parse(sessionStorage.user);
  const [formVisible, setFormVisible] = useState(false);
  const [sessionName, setSessionName] = useState('ddd');
  const [isRunning, setIsRunning] = useState(false);
  const [gameScore, setGameScore] = useState([]);
  const [alertResultGame, setAlertResultGame] = useState(false);
  const [currentIssue, setCurrentIssue] = useState(0);

  // const gameScore = [
  //   {
  //     name: 'asd',
  //     lastName: 'asd',
  //     avatarURL: 'asd',
  //     jobPosition: 'sdf',
  //     id: 'sdf',
  //     point: 3,
  //   },
  // ];
  const gameCards = useSelector(
    (state: RootState) => state.chatReducer.gameCards,
  );
  // const gameCards = [
  //   {
  //     cardValue: 2,
  //     id: 1,
  //   },
  //   {
  //     cardValue: 3,
  //     id: 1,
  //   },
  // ];
  const [visibilCard, setVisibilCard] = useState<number[]>([]);
  const issues = useSelector((state: RootState) => state.chatReducer.issues);
  // const issues = [
  //   {
  //     id: 'asdas',
  //     title: 'asd',
  //     link: 'asd',
  //     priority: 'asd',
  //   },
  //   {
  //     id: '123',
  //     title: '123',
  //     link: '123',
  //     priority: '123',
  //   },
  //   {
  //     id: '3',
  //     title: '3',
  //     link: '3',
  //     priority: '3',
  //   },
  // ];

  // const masters = useSelector(
  //   (state: RootState) => state.chatReducer.setting.masterPlayer,
  // );
  const masters = true;
  const timer = useSelector(
    (state: RootState) => state.chatReducer.setting.needTimer,
  );
  // const time = useSelector(
  //   (state: RootState) => state.chatReducer.setting.roundTime,
  // );

  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );

  // const { gameID } = sessionStorage;
  const { Option } = Select;
  const carouselRef: RefObject<any> = React.createRef();
  const dispatch = useDispatch();

  const sorting = (sortby: string): void => {
    switch (sortby) {
      case 'asc':
        socket.emit('SORT_ISSUES_ASC', gameID);
        dispatch(getUsersParams(gameID));
        break;
      case 'desc':
        socket.emit('SORT_ISSUES_DESC', gameID);
        dispatch(getUsersParams(gameID));
        break;
      case 'first':
        socket.emit('FIRST_ORDER_ISSUES', gameID);
        dispatch(getUsersParams(gameID));
        break;
      default:
        break;
    }
  };

  const history = useHistory();
  const result = (): void => {
    history.push('/result');
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

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/session-name/${gameID}`)
      .then((res) => setSessionName(res.data));
    socket.on('GET_USER_POINT', (data) => setGameScore(data));
    socket.on('ROUND_RUN', () => {
      setIsRunning(true);
    });
  }, [gameScore]);

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

  window.onload = () => {
    sessionStorage.setItem('socket.id', JSON.stringify(socket.id));

    const joinState = {
      master: {
        name: currentUser.name,
        lastName: currentUser.lastName,
        jobPosition: currentUser.jobPosition,
        avatarURL: currentUser.avatarURL,
        id: socket.id,
      },
      gameID,
    };
    socket.emit('GAME_JOIN_MASTER', joinState);
    dispatch(getUsersParams(gameID));
  };

  return sessionName.length > 0 ? (
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
                <div>
                  <div>
                    <Button
                      type="primary"
                      className={styles.button}
                      style={{ width: '100%' }}
                      onClick={() => {
                        result();
                        socket.emit('END_VOTING', gameID);
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
                      onClick={() => {
                        setAlertResultGame(true);
                        changeVisibilCard(-1);
                        carouselRef.current.goTo(currentIssue + 1);
                        setCurrentIssue((prev) => prev + 1);
                        socket.emit('NEXT_CURRENT_ISSUE', gameID, currentIssue);
                        socket.emit('END_VOTING', gameID);
                      }}
                    >
                      Next Issues
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.process}>
              <div className={styles.issue}>
                <div className={styles.issues_sort}>
                  <FormItem name="sort" className={styles.sort}>
                    <Select
                      placeholder="Sorting by"
                      allowClear
                      onSelect={(value) => sorting(`${value}`)}
                    >
                      <Option value="first">FIRST ORDER</Option>
                      <Option value="ask">ASC</Option>
                      <Option value="desc">DESC</Option>
                    </Select>
                  </FormItem>
                  <h2 className={styles.issues_title}>Issues: </h2>
                </div>
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
                  <div>
                    <div
                      style={{
                        height: '150px',
                        lineHeight: '130px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <button
                        type="button"
                        style={{ background: 'none', border: 'none' }}
                        onClick={() => {
                          setFormVisible(true);
                        }}
                      >
                        <CreateIssue />
                      </button>
                    </div>
                  </div>
                </Carousel>
              </div>
            </div>
            {masters && (
              <div className={styles.process}>
                <Row style={{ width: '100%' }} justify="center">
                  <div className={styles.card_button_wrapper}>
                    <button
                      type="button"
                      disabled={timer ? !isRunning : false}
                      style={{
                        border: 'none',
                        opacity: visibilCard[0],
                        padding: 0,
                        background: 'none',
                        height: '100%',
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
            )}
          </div>
          <IssueForm
            formVisible={formVisible}
            setFormVisible={setFormVisible}
          />
        </div>
        <div className={styles.game__part_score}>
          <div className={styles.score_title}>
            <h2>Score:</h2>
            <h2>Players:</h2>
          </div>
          <Col style={{ width: '100%' }}>
            {gameScore.length > 0 ? (
              gameScore.map((user: IGameScore) => (
                <div className={styles.score}>
                  <div>
                    <ScoreCard visibil point={user.point} />
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
      {alertResultGame && (
        <div style={{ position: 'fixed' }}>
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

export default GamePage;
