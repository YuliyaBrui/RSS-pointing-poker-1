import Button from 'antd/lib/button';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import styles from './KickMemberForm.module.scss';

type IKickForm = {
  formVisible: boolean;
  setFormVisible: (a: boolean) => void;
};

const KickMemberForm = ({
  formVisible,
  setFormVisible,
}: IKickForm): JSX.Element => {
  const user = useSelector((state: RootState) => state.chatReducer);
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
            {`${user.user.name} want to kick member`}
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
