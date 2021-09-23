/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { Button } from 'antd';
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
import Chat from '../../components/Chat/Chat';

const GamePage = (): JSX.Element => {

 /* const issues = [
    {
      title: 'string',
      link: 'string',
      priority: 'string',
      id: 'string',
    },
  ];*/
  const [formVisible, setFormVisible] = useState(false);
  const issues = useSelector((state: RootState) => state.chatReducer);
  const users = useSelector((state: RootState) => state.chatReducer);
  const history = useHistory();
  const result = (): void => {
    history.push('/result');
  };

  return (
    <div className={styles.game_wrapper}>
      <div className={styles.game_part}>
        <h1 className={styles.game_title}>
          Sprint 23 planning (issues 13, 533, 5623, 3252, 6623, ...)
        </h1>
        <div className={styles.game_info}>
          <div className={styles.game_side}>
            <div>
              <ScramMasterInfo />
            </div>
            <div>
              <Button type="primary" className={styles.button} onClick={result}>
                Stop game
              </Button>
            </div>
            <div>
              <Timer />
            </div>
          </div>
          <div className={styles.issue}>
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
        </div>
        <IssueForm formVisible={formVisible} setFormVisible={setFormVisible} />
      </div>
      <div className={styles.line}> </div>
      <div className={styles.score_part}>
        <div className={styles.score_title}>
          <div>
            <h1>Score:</h1>
            <Col style={{ width: '100%' }}>
              {users.users.members.map((user) => (
                <UserCard
                  id={user.id}
                  name={user.name}
                  avatar={user.avatarURL}
                  position={user.jobPosition}
                  visibil="visible"
                  key={user.name}
                  lastName={user.lastName}
                />
              ))}
            </Col>
          </div>
          <div>
            <h1>Players:</h1>
            <Col style={{ width: '100%' }}>
              {users.users.members.map((user) => (
                <UserCard
                  id={user.id}
                  name={user.name}
                  avatar={user.avatarURL}
                  position={user.jobPosition}
                  visibil="visible"
                  key={user.name}
                  lastName={user.lastName}
                />
              ))}
            </Col>
            
          </div>
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default GamePage;
