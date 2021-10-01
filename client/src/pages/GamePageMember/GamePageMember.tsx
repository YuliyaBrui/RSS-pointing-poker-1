/* eslint-disable operator-linebreak */
import React, { useEffect, useReducer, useState } from 'react';
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
import Statistics from '../../components/Statistics/Statistics';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import { socket } from '../../socket';
import { getUsersParams } from '../../redux/actions/createSession';
import Chat from '../../components/Chat/Chat';
import { setRoundTime } from '../../redux/actions/gameSetting';

type IGameScore = {
  name: string;
  lastName: string;
  jobPosition: string;
  avatarURL: string;
  id: string;
  point: number;
};

const GamePageMember = (): JSX.Element => {
  const [sessionName, setSessionName] = useState('New session');
  const [formVisible, setFormVisible] = useState(false);
  const [timer, setTimer] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const issues = useSelector((state: RootState) => state.chatReducer);
  const gameCards = useSelector((state: RootState) => state.gameCards);
  const masters = useSelector(
    (state: RootState) => state.gameSetting.masterPlayer,
  );
  const [gameScore, setGameScore] = useState([]);
  // setTimer(
  //   useSelector((state: RootState) => state.chatReducer.setting.needTimer),
  // );
  const [visibilCard, setVisibilCard] = useState<number[]>([]);

  // const joinMember = useSelector((state: RootState) => state.chatReducer);
  // const masters = useSelector(
  //   (state: RootState) => state.gameSetting.masterPlayer,
  // );

  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );

  const history = useHistory();
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

  useEffect(() => {
    axios
      .get(`http://localhost:3002/session-name/${gameID}`)
      .then((res) => setSessionName(res.data));
    dispatch(getUsersParams(gameID));
    // dispatch(setRoundTime());
    socket.on('GET_USER_POINT', (data) => setGameScore(data));
    socket.emit('GET_GAME_CARDS', gameID);
  }, [gameScore, gameCards]);

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
                <Button type="primary" className={styles.button} onClick={exit}>
                  EXIT
                </Button>
              </div>
            </div>
            <div className={styles.process}>
              <div className={styles.issue}>
                <h2 className={styles.game_title}>Issues: </h2>
                <Carousel arrows {...settings}>
                  {issues &&
                    issues.issues.map((issue: IIssue) => (
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
                </Carousel>
              </div>
              <div>
                <h2 className={styles.game_title}>Statistics:</h2>
                <Statistics />
              </div>
              <div>
                <Row style={{ width: '100%' }} justify="center">
                  <div className={styles.card_button_wrapper}>
                    <Button
                      type="ghost"
                      style={{
                        border: 'none',
                        padding: '0',
                        height: '100%',
                        zIndex: visibilCard[0],
                        margin: '-5px',
                      }}
                      onClick={() => {
                        setUserPoint(0);
                        changeVisibilCard(0);
                      }}
                    >
                      <CoffeeGameCard />
                    </Button>
                  </div>
                  {gameCards.map((gameCard: IGameCard, i: number) => (
                    <div
                      className={styles.card_button_wrapper}
                      key={gameCard.id}
                    >
                      <Button
                        type="default"
                        style={{
                          border: 'none',
                          padding: '0',
                          height: '100%',
                          zIndex: visibilCard[i + 1],
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
                      </Button>
                    </div>
                  ))}
                </Row>
              </div>
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
              <div>Waiting for the votes of the players...</div>
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
