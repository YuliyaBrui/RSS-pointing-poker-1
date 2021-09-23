import Card from 'antd/lib/card';
import React from 'react';
import styles from './ScoreCard.module.scss';

const ScoreCard = (): JSX.Element => (
  <Card style={{ width: '150px', height: '80px', margin: '5px' }}>
    <div className={styles.score_info}>In Progress</div>
  </Card>
);

export default ScoreCard;
