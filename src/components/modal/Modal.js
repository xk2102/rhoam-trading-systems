// https://www.youtube.com/watch?v=LyLa7dU5tp8

import ReactDom from "react-dom";
import styles from "./Modal.module.css";
// import { useContext } from "react";
// import { GlobalContext } from "../../contexts/GlobalContext";
import Logo from "../Boxes/BoxB/Logo";

export default function Modal({ modalIsOpen, resetModal, modalContent, modalType }) {
  // const _GlobalContext = useContext(GlobalContext);
  // const {} = _GlobalContext;

  const renderhello = () => {
    return (
      <div className={`${styles.modal} animate`}>
        <div className={styles.header}>
          <Logo />
        </div>
        <div className={styles.content}>
          <p>hello</p>
          {modalContent}
        </div>
        <div className={styles.footer}>
          <button onClick={() => resetModal()}>BACK</button>
        </div>
      </div>
    );
  };
  if (!modalIsOpen) return null;
  return ReactDom.createPortal(
    <>
      <div className={`animate ${styles.overlay}`} />
      {modalType === "hello" && renderhello()}
    </>,
    document.getElementById("portal")
  );
}
