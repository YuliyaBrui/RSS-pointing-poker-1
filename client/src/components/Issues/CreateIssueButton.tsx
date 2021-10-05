import React from 'react';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import Card from 'antd/lib/card';
import styles from './Issue.module.scss';

const CreateIssue = (): JSX.Element => (
  <Card
    style={{ width: '260px', height: '90px', margin: '5px' }}
    bodyStyle={{ height: '90px', display: 'flex', alignItems: 'center' }}
  >
    <div className={styles.main__create_issue_wrapper}>
      <h2 className={styles.main__issue_title}>Create new Issue</h2>
      <PlusOutlined
        style={{ fontSize: '250%', margin: '1%' }}
        className={styles.main__icon}
      />
    </div>
  </Card>
);

export default CreateIssue;
