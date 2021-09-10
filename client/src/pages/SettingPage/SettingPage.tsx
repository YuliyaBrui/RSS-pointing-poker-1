import React, { useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import Row from 'antd/lib/grid/row';
import styles from './SettingPage.module.scss';
import SessionInfo from '../../components/SettingPagePart/SessionInfo/SessionInfo';
import StartCancelButtons from '../../components/SettingPagePart/StartCancelButton/StartCancelButton';
import UserCard from '../../components/UserCard/UserCard';
import Issues from '../../components/Issues/Issue';
import CreateIssue from '../../components/Issues/CreateIssueButton';
import IssueForm from '../../components/Issues/IssueForm';
import GameSetting from '../../components/SettingPagePart/GameSetting/GameSetting';
import CreateGameCard from '../../components/GameCard/CreateGameCard';
import GameCard from '../../components/GameCard/GameCard';
import CoffeeGameCard from '../../components/GameCard/CoffeeGameCard';

const SettingPage = (): JSX.Element => {
  const [issues, setIssues] = useState([<Issues />, <Issues />, <Issues />]);
  const [gameCard, setGameCard] = useState([
    <CoffeeGameCard />,
    <GameCard />,
    <GameCard />,
    <GameCard />,
  ]);
  const [formVisible, setFormVisible] = useState(false);

  const users = [
    {
      name: 'Keanu Reeves',
      position: 'JS-developer',
      avatar:
        'https://avatars.mds.yandex.net/get-pdb/2846431/30e3043d-7e95-4653-bca7-5bb61219df86/s1200?webp=false',
    },
    {
      name: 'Tom Cruise',
      position: 'Backend-developer',
      avatar:
        'https://avatars.mds.yandex.net/get-zen_doc/1245815/pub_5bc9d59d3491a600a9655d81_5bc9d9229989ff00ae413c2a/scale_1200',
    },
  ];

  return (
    <Content className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.main__panel}>
          <SessionInfo />
          <StartCancelButtons />
        </div>
        <div className={styles.main__panel}>
          <h3>Members:</h3>
          <Row style={{ width: '100%' }} justify="start">
            {users.map((user) => (
              <UserCard
                name={user.name}
                avatar={user.avatar}
                position={user.position}
                visibility="visible"
              />
            ))}
          </Row>
        </div>
        <div className={styles.main__panel}>
          <h3>Issues:</h3>
          <Row style={{ width: '100%' }} justify="start">
            {issues.map((issue) => issue)}
            <button
              className={styles.main__button_invis}
              type="button"
              onClick={() => setFormVisible(true)}
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
            {gameCard.map((card) => card)}
            <button className={styles.main__button_invis} type="button">
              <CreateGameCard />
            </button>
          </Row>
        </div>
      </div>
      <IssueForm formVisible={formVisible} setFormVisible={setFormVisible} />
    </div>
  );
};

export default SettingPage;
