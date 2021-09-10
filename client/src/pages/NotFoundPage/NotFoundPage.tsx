import React from 'react';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = (): JSX.Element => (
  <div className={styles.main}>
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Page not found!</h2>
    </div>
  </div>
);

export default NotFoundPage;
