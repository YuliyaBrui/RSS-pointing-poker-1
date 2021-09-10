import React from 'react';
import Card from 'antd/lib/card';
import { UserOutlined } from '@ant-design/icons';
import styles from './ScramMasterCard.module.scss';

const ScramMasterInfo = (): JSX.Element => {
  const state: RootState = store.getState();
  const asd = 123;
  return (
    <Card title="Scram master:" style={{ width: '30%', height: '100%' }}>
      <div className={styles.main__scram_master_info}>
        <UserOutlined style={{ fontSize: '500%' }} />
        <div className={styles.main__scram_master_description}>
          <h3>Rick Giligan</h3>
          <p>lead software engeneer</p>
        </div>
      </div>
    </Card>
  );
};

export default ScramMasterInfo;
