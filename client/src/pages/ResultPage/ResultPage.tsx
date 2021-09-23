/* eslint-disable operator-linebreak */
import React from 'react';
import Col from 'antd/lib/grid/col';
import { useSelector } from 'react-redux';
import Issue from '../../components/Issues/Issue';
import { RootState } from '../../redux';
import { IIssue } from '../../redux/types/issues';
import Statistics from '../../components/Statistics/Statistics';
import styles from './ResultPage.module.scss';

const ResultPage = (): JSX.Element => {
  const issues = useSelector((state: RootState) => state.chatReducer);

  return (
    <div className={styles.wrapper}>
      <div className={styles.result_wrapper}>
        <h1 className={styles.result_title}>Sprint 23 planning</h1>
        <div className={styles.issue}>
          <Col style={{ width: '100%' }}>
            {issues &&
              issues.issues.map((issue: IIssue) => (
                <div className={styles.issue_result}>
                  <Issue
                    title={issue.title}
                    priority={issue.priority}
                    link={issue.link}
                    id={issue.id}
                    key={issue.id}
                  />
                  <Statistics />
                </div>
              ))}
          </Col>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
