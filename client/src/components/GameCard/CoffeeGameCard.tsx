import CoffeeOutlined from '@ant-design/icons/lib/icons/CoffeeOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input/Input';
import React, { useState } from 'react';
import styles from './GameCard.module.scss';

const CoffeeGameCard = (): JSX.Element => {
  const [cardName, setCardName] = useState('Coffee break');
  const [editCardName, setEditCardName] = useState(false);

  return (
    <Card style={{ width: 150, height: 200, margin: '5px' }}>
      <div className={styles.main__coffee_card}>
        <div className={styles.main__title}>
          <Input
            className={!editCardName ? styles.main__input_disabled : ''}
            size="small"
            disabled={!editCardName}
            defaultValue={cardName}
            onChange={(e) => setCardName(e.target.value)}
            onPressEnter={() => setEditCardName(false)}
          />
          <Button
            type="default"
            style={{ border: 'none', padding: 0 }}
            onClick={() => setEditCardName(!editCardName)}
          >
            <EditOutlined style={{ fontSize: '150%', margin: '1%' }} />
          </Button>
        </div>
        <CoffeeOutlined style={{ fontSize: '500%', width: '100%' }} />
        <Input
          className={styles.main__input_disabled}
          style={{ transform: 'rotate(180deg)' }}
          size="small"
          disabled
          value={cardName}
        />
      </div>
    </Card>
  );
};
export default CoffeeGameCard;
