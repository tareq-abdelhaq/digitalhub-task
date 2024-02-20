import { Fragment } from "react";

import classes from "./Modal.module.css";

function Modal(props) {
  const { children, onClose } = props;

  return (
    <Fragment>
      <div className={classes.backdrop} onClick={onClose} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </Fragment>
  );
}

export default Modal;
