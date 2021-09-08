import React from 'react';
import { Button, Input, Space } from 'antd';
import styles from './StartPage.module.scss';

const { Search } = Input;

const StartPage = (): JSX.Element => (
  <div className={styles.start_page}>
    <div className={styles.wrapper}>
      <img
        src="../../assets/images/poker.png"
        alt="poker"
        className={styles.main_poker}
      />
      <h2 className={styles.title}>Start your planning:</h2>
      <div className={styles.session}>
        <p className={styles.subtitle}>Create session:</p>
        <Button type="primary" className={styles.button}>
          Start new game
        </Button>
      </div>
      <h2 className={styles.title}>OR:</h2>
      <p className={styles.subtitle}>Connect to lobby by URL:</p>
      <Space direction="vertical" className={styles.input}>
        <Search
          placeholder=" "
          allowClear
          enterButton="Connect"
          size="large"
          //   onSearch={onSearch}
        />
      </Space>
    </div>
  </div>
);

export default StartPage;
