import React from 'react';
import Card from 'antd/lib/card';
import { UserOutlined } from '@ant-design/icons';
import './ScramMasterInfo.scss';

const ScramMasterInfo = (): JSX.Element => {
  const asd = 123;
  return (
    <Card title="Scram master:" style={{ width: '30%', height: '100%' }}>
      <div className="main__scram-master-info">
        <UserOutlined style={{ fontSize: '500%' }} />
        <div className="main__scram-master-description">
          <h3>Rick Giligan</h3>
          <p>lead software engeneer</p>
        </div>
      </div>
    </Card>
  );
};

export default ScramMasterInfo;
