import PlusCircleOutlined from '@ant-design/icons/lib/icons/PlusCircleOutlined';
import Card from 'antd/lib/card';
import React from 'react';
import styles from './GameCard.module.scss';

const CreateGameCard = (): JSX.Element => (
  <Card
    style={{
      width: 150,
      height: 200,
      cursor: 'pointer',
      margin: '5px',
    }}
  >
    <div className={styles.main__card_create}>
      <PlusCircleOutlined
        style={{ fontSize: '400%' }}
        className={styles.main__icon}
      />
    </div>
  </Card>
);

export default CreateGameCard;
