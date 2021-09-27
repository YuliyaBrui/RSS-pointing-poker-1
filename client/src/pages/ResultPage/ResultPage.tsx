/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import Col from 'antd/lib/grid/col';
import axios from 'axios';
import Button from 'antd/lib/button';
import Issue from '../../components/Issues/Issue';
import { IIssue } from '../../redux/types/issues';
import styles from './ResultPage.module.scss';
import GameCard from '../../components/GameCard/GameCard';
import CoffeeGameCard from '../../components/GameCard/CoffeeGameCard';

interface TStatistics extends Object {
  [point: number]: number[];
}

const ResultPage = (): JSX.Element => {
  const [sessionName, setSessionName] = useState('New session');
  const [gameResults, setGameResults] = useState<TStatistics>({});

  // const issues = useSelector((state: RootState) => state.chatReducer.issues);
  const issues = [
    {
      id: 'B4KiL-ix6m',
      title: 'rew',
      link: 'wer',
      priority: 'low',
    },
    {
      id: 'B4K-ix6m',
      title: 'rew',
      link: '123',
      priority: 'high',
    },
  ];

  useEffect(() => {
    axios
      .get('http://localhost:3002/session-name/1111')
      .then((res) => setSessionName(res.data));
    axios
      .get('http://localhost:3002/result/1111')
      .then((res) => setGameResults(res.data));
  }, []);

  const blob = new Blob(
    [sessionName, JSON.stringify(gameResults), JSON.stringify(issues)],
    {
      type: 'text/plain',
    },
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.result_wrapper}>
        <div className={styles.header_wrapper}>
          <h2 className={styles.result_title}>{sessionName}</h2>
          <Button type="primary" className={styles.save_button}>
            <a href={URL.createObjectURL(blob)} download>
              Save results
            </a>
          </Button>
        </div>
        <Col style={{ width: '100%' }}>
          {issues &&
            issues.map((issue: IIssue, index) => (
              <div className={styles.issues_results}>
                <Issue
                  title={issue.title}
                  priority={issue.priority}
                  link={issue.link}
                  id={issue.id}
                  key={issue.id}
                />
                {Object.keys(gameResults).length > 1 && (
                  <div className={styles.issue_votes}>
                    {Object.entries(gameResults[index]).map(([key, value]) => (
                      <div className={styles.card_wrapper}>
                        {key !== '0' ? (
                          <GameCard cardValue={+key} id={+key} />
                        ) : (
                          <CoffeeGameCard />
                        )}
                        <div className={styles.value}>{`${value}%`}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </Col>
      </div>
    </div>
  );
};

export default ResultPage;
