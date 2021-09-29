/* eslint-disable operator-linebreak */
import React, { useEffect, useReducer, useState } from 'react';
import { Button } from 'antd';
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

const GamePageMember = (): JSX.Element => {
  const [sessionName, setSessionName] = useState('New session');
  const [formVisible, setFormVisible] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);
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

  const history = useHistory();
  const exit = (): void => {
    history.push('/');
  };

  const setUserPoint = (point: number): void => {
    socket.emit('SET_USER_POINT', gameID, { ...currentUser, point });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3002/session-name/${gameID}`)
      .then((res) => setSessionName(res.data));
    dispatch(getUsersParams(gameID));
  }, []);

  return (
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
                <Button type="primary" className={styles.button} onClick={exit}>
                  EXIT
                </Button>
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
                    issues.map((issue: IIssue) => (
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
                    id={joinMember.users.master.id}
                    key={joinMember.users.master.name}
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
    </div>
  );
};

export default GamePageMember;
