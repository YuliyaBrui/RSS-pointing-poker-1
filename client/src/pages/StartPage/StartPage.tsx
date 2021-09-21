import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import styles from './StartPage.module.scss';
import { FormCreateGame } from '../../components/FormCreateGame/FormCreateGame';
import { FormConnect } from '../../components/FormConnect/FormConnect';
import { Modal } from '../../components/modal/Modal';

const StartPage = (): JSX.Element => {
  const [activeFormCreate, setActiveFormCreate] = useState(false);
  const [activeFormConnect, setActiveFormConnect] = useState(false);
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.main_poker}> </div>
        <h2 className={styles.title}>Start your planning:</h2>
        <div className={styles.session}>
          <p
            className={styles.subtitle}
            style={{ width: '260px', textAlign: 'left' }}
          >
            Create session:
          </p>
          <Button
            type="primary"
            style={{ width: '260px' }}
            onClick={() => setActiveFormCreate(true)}
          >
            Start new game
          </Button>
        </div>
        <h2 className={styles.title}>OR:</h2>
        <p className={styles.subtitle}>Connect to lobby by URL:</p>
        <Space direction="horizontal" className={styles.connect}>
          <Input
            placeholder="Basic usage"
            style={{ width: '260px', height: '47px' }}
          />
          <Button
            type="primary"
            style={{ width: '260px' }}
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
