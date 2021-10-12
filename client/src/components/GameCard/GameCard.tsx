import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input/Input';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import {
  changeGameCardValue,
  deleteGameCard,
} from '../../redux/actions/gameCards';
import { IGameCard } from '../../redux/types/gameCard';
import styles from './GameCard.module.scss';

const GameCard = ({ cardValue, id }: IGameCard): JSX.Element => {
  const dispatch = useDispatch();
  const shortType = useSelector(
    (state: RootState) => state.gameSetting.shortScoreType,
  );
  const gameCards = useSelector((state: RootState) => state.gameCards);
  const [editCardValue, setEditCardValue] = useState(false);

  const location = useLocation();
 /* const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
*/
  const { gameID } = sessionStorage;
  const changeCardValue = (inputCardValue: string): void => {
    gameCards.map((value: IGameCard) => {
      const newValue = value;
      if (newValue.id === id) {
        newValue.cardValue = +inputCardValue;
      }
      return newValue;
    });
    dispatch(changeGameCardValue(gameCards));
  };

  const deleteCard = (): void => {
    gameCards.map((value: IGameCard, index: number) => {
      const newValue = value;
      if (newValue.id === id) {
        gameCards.splice(index, 1);
      }
      return newValue;
    });
    dispatch(deleteGameCard(gameCards));
  };

  return (
    <Card style={{ width: 150, height: 200, margin: '5px' }}>
      <div className={styles.main__coffee_card}>
        <div className={styles.main__title}>
          <h3>{`${shortType}`}</h3>
          {location.pathname === `/setting/${gameID}` && (
            <div className={styles.main__button_wrapper}>
              <div className={editCardValue ? '' : styles.main__close_icon}>
                <Button
                  type="default"
                  style={{ border: 'none', padding: 0 }}
                  onClick={() => deleteCard()}
                >
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
          )}
        </div>
        <Input
          className={!editCardValue ? styles.main__input_disabled : ''}
          style={{ textAlign: 'center', fontSize: 40, cursor: 'pointer' }}
          size="large"
          disabled={!editCardValue}
          defaultValue={cardValue}
          onChange={(e) => changeCardValue(e.target.value)}
          onPressEnter={() => setEditCardValue(false)}
        />
        <h3 style={{ transform: 'rotate(180deg)' }}>{`${shortType}`}</h3>
      </div>
    </Card>
  );
};

export default GameCard;
