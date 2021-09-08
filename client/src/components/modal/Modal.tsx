import { ReactChild, ReactChildren } from "react";

import style from "../modal/Modal.module.scss";
interface modalProps {
  active: boolean;
  children: ReactChild | ReactChildren;
}
export const Modal = ({ active, children }: modalProps) => {
  return (
    <div className={`${style.modal} ${active ? style.modal_active : ""}`}>
      <div
        className={`${style.modal__content} ${
          active ? style.modal__content_active : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};
