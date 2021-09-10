import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input/Input';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import styles from './GameCard.module.scss';

const GameCard = (): JSX.Element => {
  const shortType = useSelector(
    (state: RootState) => state.shortScoreType.shortScoreType,
  );
  const [cardValue, setCardValue] = useState('1');
  const [editCardValue, setEditCardValue] = useState(false);

  return (
    <Card style={{ width: 150, height: 200, margin: '5px' }}>
      <div className={styles.main__coffee_card}>
        <div className={styles.main__title}>
          <h3>{`${shortType}`}</h3>
          <div className={styles.main__button_wrapper}>
            <div className={editCardValue ? '' : styles.main__close_icon}>
              <Button type="default" style={{ border: 'none', padding: 0 }}>
                <CloseOutlined
                  style={{ fontSize: '150%', margin: '1%', color: 'red' }}
                />
              </Button>
            </div>
            <Button
              type="default"
              style={{ border: 'none', padding: 0 }}
              onClick={() => setEditCardValue(!editCardValue)}
            >
              <EditOutlined style={{ fontSize: '150%', margin: '1%' }} />
            </Button>
          </div>
        </div>
        <Input
          className={!editCardValue ? styles.main__input_disabled : ''}
          style={{ textAlign: 'center', fontSize: 40 }}
          size="large"
          disabled={!editCardValue}
          defaultValue={cardValue}
          onChange={(e) => setCardValue(e.target.value)}
          onPressEnter={() => setEditCardValue(false)}
        />
        <h3 style={{ transform: 'rotate(180deg)' }}>{`${shortType}`}</h3>
      </div>
    </Card>
  );
};
export default GameCard;
