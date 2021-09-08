import { DeleteOutlined, EditOutlined } from '@ant-design/icons/lib/icons';
import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input/Input';
import React, { useState } from 'react';
import './Issue.scss';

const Issue = (): JSX.Element => {
  const [issueName, setIssueName] = useState('Issue name');
  const [editIssueName, setEditIssueName] = useState(false);

  return (
    <Card style={{ width: '250px' }}>
      <div className="main__content-wrapper">
        <Input
          className={!editIssueName ? 'main__input-disabled' : ''}
          size="small"
          disabled={!editIssueName}
          defaultValue={issueName}
          onChange={(e) => setIssueName(e.target.value)}
          onPressEnter={() => setEditIssueName(!issueName)}
        />
        <div className="main__button-wrapper">
          <Button
            type="default"
            style={{ border: 'none' }}
            onClick={() => setEditIssueName(!editIssueName)}
          >
            <EditOutlined style={{ fontSize: '150%', margin: '1%' }} />
          </Button>
          <Button type="default" style={{ border: 'none' }}>
            <DeleteOutlined
              style={{ fontSize: '150%', margin: '1%', color: 'red' }}
            />
          </Button>
        </div>
      </div>
      <p className="main__priority">low priority</p>
    </Card>
  );
};

export default Issue;
