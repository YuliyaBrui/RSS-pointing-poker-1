import Button from 'antd/lib/button';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { kickForm } from '../../redux/actions/kickForm';
import { socket } from '../../socket';
import styles from './KickMemberForm.module.scss';

const KickMemberForm = ({ formVisible, setFormVisible }: any): JSX.Element => {
  const dispatch = useDispatch();

  const formData = (kickData: any): void => {
    dispatch(kickForm(kickData));
  };
  const kickUserData = useSelector((state: RootState) => state.kickUserData);

  useEffect(() => {
    socket.on('KICK_DATA', formData);
  }, []);
  return (
    <div
      className={
        kickUserData.visibil
          ? `${styles.kick} ${styles.kick__active}`
          : `${styles.kick}`
      }
      onClick={() => setFormVisible(false)}
    >
      <div className={styles.kick__content}>
        <h2>Kick member</h2>
        <div className={styles.kick__description_wrapper}>
          <p className={styles.kick__description}>
            {`${kickUserData.initiator.name} ${kickUserData.initiator.lastName} want to kick member ${kickUserData.exclusion.name} ${kickUserData.exclusion.name}`}
          </p>
          <p className={styles.kick__description}>Do you agree with it?</p>
        </div>
        <div className={styles.kick__buttons}>
          <Button type="primary" style={{ width: '100px' }}>
            Yes
          </Button>
          <Button
            type="default"
            style={{ width: '100px' }}
            onClick={() => dispatch(kickForm({ ...kickUserData, visibil: false }))}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KickMemberForm;
