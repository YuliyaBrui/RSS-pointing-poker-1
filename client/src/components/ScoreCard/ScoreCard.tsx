/* eslint-disable prettier/prettier */
import Card from 'antd/lib/card';
import React from 'react';
import styles from './ScoreCard.module.scss';

type IScoreCard = {
  visibil: boolean;
  point: number;
}

const ScoreCard = ({ visibil, point }: IScoreCard): JSX.Element => (visibil ? (
  <Card style={{ width: '150px', height: '80px', margin: '5px' }}>
    <div className={styles.score_info}>{point}</div>
  </Card>
) : (
  <Card style={{ width: '150px', height: '80px', margin: '5px' }}>
    <div className={styles.score_info}>In Progress</div>
  </Card>
));

export default ScoreCard;
