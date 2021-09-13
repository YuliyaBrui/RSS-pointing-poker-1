import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import styles from './StartPage.module.scss';
import { Modal } from '../../components/modal/Modal';
import { FormCreateGame } from '../../components/FormCreateGame/FormCreateGame';
import { FormConnect } from '../../components/FormConnect/FormConnect';

const StartPage = (): JSX.Element => {
  const [activeFormCreate, setActiveFormCreate] = useState(false);
  const [activeFormConnect, setActiveFormConnect] = useState(false);
  return (
    <div className={styles.start_page}>
      <div className={styles.wrapper}>
        <div className={styles.main_poker}> </div>
        <h2 className={styles.title}>Start your planning:</h2>
        <div className={styles.session}>
          <p className={styles.subtitle}>Create session:</p>
          <Button
            type="primary"
            className={styles.button}
            onClick={() => setActiveFormCreate(true)}
          >
            Start new game
          </Button>
        </div>
        <h2 className={styles.title}>OR:</h2>
        <p className={styles.subtitle}>Connect to lobby by URL:</p>
        <Space direction="vertical">
          <Input placeholder="Basic usage" className={styles.input} />
          <Button
            type="primary"
            className={styles.button}
            onClick={() => setActiveFormConnect(true)}
          >
            Connect
          </Button>
        </Space>
      </div>
      <Modal active={activeFormCreate}>
        <FormCreateGame setActive={setActiveFormCreate} />
      </Modal>
      <Modal active={activeFormConnect}>
        <FormConnect setActive={setActiveFormConnect} />
      </Modal>
    </div>
  );
};

export default StartPage;
