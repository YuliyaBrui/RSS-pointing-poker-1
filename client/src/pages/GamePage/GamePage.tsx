/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { Button, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

const GamePage = (): JSX.Element => {
  const [formVisible, setFormVisible] = useState(false);
  const issues = useSelector((state: RootState) => state.chatReducer);
  const gameCards = useSelector((state: RootState) => state.gameCards);
  const joinMember = useSelector((state: RootState) => state.chatReducer);
  const masters = useSelector(
    (state: RootState) => state.gameSetting.masterPlayer,
  );
  const timer = useSelector((state: RootState) => state.gameSetting.needTimer);

  const history = useHistory();
  const result = (): void => {
    history.push('/result');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.game}>
        <div className={styles.game__part_game}>
          <h1 className={styles.game_title}>
            Sprint 23 planning (issues 13, 533, 5623, 3252, 6623, ...)
          </h1>
          <div className={styles.game_info}>
            <div className={styles.game_side}>
              <div>
                <ScramMasterInfo />
              </div>
              <div>
                <Button
                  type="primary"
                  className={styles.button}
                  onClick={result}
                >
                  Stop game
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
                <Col>
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
                    className={styles.button_issue}
                    type="button"
                    onClick={() => setFormVisible(true)}
                  >
                    <CreateIssue />
                  </button>
                </Col>
              </div>
              <div>
                <h2 className={styles.game_title}>Statistics:</h2>
                <Statistics />
              </div>
              {masters && (
                <div>
                  <Row style={{ width: '100%' }} justify="center">
                    <CoffeeGameCard />
                    {gameCards.map((gameCard: IGameCard) => (
                      <GameCard
                        cardValue={gameCard.cardValue}
                        id={gameCard.id}
                        key={gameCard.id}
                      />
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
  );
};

export default GamePage;
