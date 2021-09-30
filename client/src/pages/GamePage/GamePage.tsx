/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import { Button, Row, Spin, Space, Alert } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Col from 'antd/lib/grid/col';
import styles from './GamePage.module.scss';
import ScramMasterInfo from '../../components/ScramMasterCard/ScramMasterCard';
import Issue from '../../components/Issues/Issue';
import Timer from '../../components/Timer/Timer';
import CreateIssue from '../../components/Issues/CreateIssueButton';
import IssueForm from '../../components/Issues/IssueForm';
import UserCard from '../../components/UserCard/UserCard';
import { RootState } from '../../redux';
import { IIssue } from '../../redux/types/issues';
import Statistics from '../../components/Statistics/Statistics';
import GameCard from '../../components/GameCard/GameCard';
import CoffeeGameCard from '../../components/GameCard/CoffeeGameCard';
import { IGameCard } from '../../redux/types/gameCard';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import Chat from '../../components/Chat/Chat';
import { socket } from '../../socket';

type IGameScore = {
  name: string;
  lastName: string;
  jobPosition: string;
  avatarURL: string;
  id: string;
  point: number;
};

const GamePage = (): JSX.Element => {
  const [formVisible, setFormVisible] = useState(false);
  const [sessionName, setSessionName] = useState('dd');
  const [gameScore, setGameScore] = useState([]);
  const [alertResultGame, setAlertResultGame] = useState(true);

  const gameCards = useSelector((state: RootState) => state.gameCards);
  const [visibilCard, setVisibilCard] = useState<number[]>([]);

  const currentUser = useSelector((state: RootState) => state.currentUser);
  const issues = useSelector((state: RootState) => state.chatReducer);
  // const masters = useSelector(
  //   (state: RootState) => state.gameSetting.masterPlayer,
  // );

  const masters = true;
  const timer = useSelector((state: RootState) => state.gameSetting.needTimer);
  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );

  const history = useHistory();
  const result = (): void => {
    history.push('/result');
  };

  const setUserPoint = (point: number): void => {
    socket.emit('SET_USER_POINT', gameID, { ...currentUser, point });
  };

  const nextIssue = (): void => {
    socket.emit('NEXT_ISSUE', gameID);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3002/session-name/${gameID}`)
      .then((res) => setSessionName(res.data));
    socket.on('GET_USER_POINT', (data) => setGameScore(data));
  }, [gameScore]);

  const changeVisibilCard = (index: number): void => {
    const visivArr = [];
    for (let k = 0; k < gameCards.length + 1; k += 1) {
      visivArr.push(1);
    }

    if (index !== -1) visivArr.splice(index, 1, 0.3);
    setVisibilCard(visivArr);
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
              <div>
                <div>
                  <Button
                    type="primary"
                    className={styles.button}
                    style={{ width: '100%' }}
                    onClick={() => {
                      result();
                      nextIssue();
                      socket.emit('GET_VOTING_RESULT', gameID);
                    }}
                  >
                    Stop game
                  </Button>
                </div>
                <div>
                  <Button
                    type="primary"
                    style={{ width: '100%' }}
                    onClick={() => {
                      changeVisibilCard(-1);
                      nextIssue();
                    }}
                  >
                    Next Issue
                  </Button>
                </div>
              </div>
              {timer && (
                <div style={{ width: '40%' }}>
                  <Timer />
                </div>
              )}
            </div>
            <div className={styles.process}>
              <div className={styles.issue}>
                <h2 className={styles.game_title}>Issues: </h2>
                <Row style={{ width: '100%' }} justify="center">
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
                </Row>
              </div>
              <div>
                <h2 className={styles.game_title}>Statistics:</h2>
                <Statistics />
              </div>
              {masters && (
                <div>
                  <Row style={{ width: '100%' }} justify="center">
                    <div className={styles.card_button_wrapper}>
                      <button
                        type="button"
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
            {gameScore.length > 0 &&
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

// {true && (
//   <div className={styles.info_wrapper}>
//     <Alert
//       className={styles.game_info}
//       closable
//       onClose={() => setAlertResultGame(false)}
//       message="Success Text"
//       description="Success Description Success Description Success Description"
//       type="info"
//     />
//   </div>
// )}
