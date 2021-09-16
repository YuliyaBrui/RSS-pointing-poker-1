import React, { ReactChild, ReactChildren } from 'react';
import styles from './Modal.module.scss';

interface modalProps {
  active: boolean;
  children: ReactChild | ReactChildren;
}
export const Modal = ({ active, children }: modalProps): JSX.Element => (
  <div className={`${styles.modal} ${active ? styles.modal_active : ''}`}>
    <div
      className={`${styles.modal__content} ${
        active ? styles.modal__content_active : ''
      }`}
    >
      {children}
    </div>
  </div>
);
