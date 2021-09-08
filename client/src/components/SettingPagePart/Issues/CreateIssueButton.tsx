import { PlusOutlined } from '@ant-design/icons/lib/icons';
import Card from 'antd/lib/card';
import React from 'react';

const CreateIssue = (): JSX.Element => (
  <Card style={{ width: '250px', height: '74px' }}>
    <div className="main__create-issue-wrapper">
      <h2 className="main__issue-title">Create new Issue</h2>
      <PlusOutlined style={{ fontSize: '250%', margin: '1%' }} />
    </div>
  </Card>
);

export default CreateIssue;
