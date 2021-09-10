import { DeleteOutlined, EditOutlined } from '@ant-design/icons/lib/icons';
import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input/Input';
import Popconfirm from 'antd/lib/popconfirm';
import React, { useState } from 'react';
import styles from './Issue.module.scss';

const Issue = (): JSX.Element => {
  const [issueName, setIssueName] = useState('Issue name');
  const [editIssueName, setEditIssueName] = useState(false);

  return (
    <Card style={{ width: '250px', margin: '5px' }}>
      <div className={styles.main__content_wrapper}>
        <Input
          className={!editIssueName ? styles.main__input_disabled : ''}
          size="small"
          disabled={!editIssueName}
          defaultValue={issueName}
          onChange={(e) => setIssueName(e.target.value)}
          onPressEnter={() => setEditIssueName(!issueName)}
        />
        <div className={styles.main__button_wrapper}>
          <Button
            type="default"
            style={{ border: 'none', padding: '0px 5px 2px 0px' }}
            onClick={() => setEditIssueName(!editIssueName)}
          >
            <EditOutlined style={{ fontSize: '150%', margin: '1%' }} />
          </Button>
          <Popconfirm title="Delete issue?" okText="Yes" cancelText="No">
            <DeleteOutlined
              style={{ fontSize: '150%', margin: '6%', color: 'red' }}
            />
          </Popconfirm>
        </div>
      </div>
      <p className={styles.main__priority}>low priority</p>
    </Card>
  );
};

export default Issue;
