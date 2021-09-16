import Button from 'antd/lib/button';
import React from 'react';
import styles from './KickMemberForm.module.scss';

type IKickForm = {
  formVisible: boolean;
  setFormVisible: (a: boolean) => void;
};

const KickMemberForm = ({
  formVisible,
  setFormVisible,
}: IKickForm): JSX.Element => {
  const asd = 123;

  return (
    <div
      className={
        formVisible ? `${styles.kick} ${styles.kick__active}` : `${styles.kick}`
      }
      onClick={() => setFormVisible(false)}
    >
      <div className={styles.kick__content}>
        <h2>Kick member</h2>
        <div className={styles.kick__description_wrapper}>
          <p className={styles.kick__description}>
            Keanu Reeves want to kick member Tom Cruise
          </p>
          <p className={styles.kick__description}>Do you Agree with it?</p>
        </div>
        <div className={styles.kick__buttons}>
          <Button type="primary" style={{ width: '100px' }}>
            Yes
          </Button>
          <Button type="default" style={{ width: '100px' }}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KickMemberForm;
