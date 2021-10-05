/* eslint-disable prettier/prettier */
import Card from 'antd/lib/card';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import styles from './ScoreCard.module.scss';

type IScoreCard = {
  point: number;
  visibil: boolean;
}

const ScoreCard = ({ visibil, point }: IScoreCard): JSX.Element => {
  const shortType = useSelector(
    (state: RootState) => state.chatReducer.setting.shortScoreType,
  );

  return (visibil ? (
    <Card style={{ width: '150px', height: '80px', margin: '5px' }} bodyStyle={{width: '100%', height: '100%'}}>
      <div className={styles.score_info}>
        {point}
        {shortType}
      </div>
    </Card>
  ) : (
    <Card style={{ width: '150px', height: '80px', margin: '5px' }}>
      <div className={styles.score_info}>Response received!</div>
    </Card>
  ));
};

export default ScoreCard;
