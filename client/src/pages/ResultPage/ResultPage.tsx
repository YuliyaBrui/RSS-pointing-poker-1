/* eslint-disable operator-linebreak */
import React from 'react';
import Col from 'antd/lib/grid/col';
import { useSelector } from 'react-redux';
import Issue from '../../components/Issues/Issue';
import { RootState } from '../../redux';
import { IIssue } from '../../redux/types/issues';
import styles from './ResultPage.module.scss';

const ResultPage = (): JSX.Element => {
  // const issues = useSelector((state: RootState) => state.issues);
  const issues = [
    {
      title: 'string',
      link: 'string',
      priority: 'string',
      id: 'string',
    },
  ];
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.result_title}>
        Sprint 23 planning (issues 13, 533, 5623, 3252, 6623, ...)
      </h1>
      <div className={styles.issue}>
        <Col style={{ width: '100%' }}>
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
        </Col>
      </div>
    </div>
  );
};

export default ResultPage;
