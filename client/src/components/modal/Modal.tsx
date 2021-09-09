import React, { ReactChild, ReactChildren } from 'react';
import style from './Modal.module.scss';

interface modalProps {
  active: boolean;
  children: ReactChild | ReactChildren;
}
export const Modal = ({ active, children }: modalProps): JSX.Element => (
  <div className={`${style.modal} ${active ? style.modal_active : ''}`}>
    <div
      className={`${style.modal__content} ${
        active ? style.modal__content_active : ''
      }`}
    >
      {children}
    </div>
  </div>
);
