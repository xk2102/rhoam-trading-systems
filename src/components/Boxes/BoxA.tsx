// CSS----------------------------------------------------
import styles from "../../App.module.css";
// LIBRARIES ---------------------------------------------
import { useMediaQuery } from "react-responsive";
// REACT -------------------------------------------------
import { useContext } from "react";
// CONTEXT -----------------------------------------------
import { GlobalContext } from "../../contexts/GlobalContext";

// COMPONENTS --------------------------------------------
import BoxB from "./BoxB";
import BoxD from "./BoxD";
import BoxC from "./BoxC";
import Modal from "../modal/Modal";

export default function BoxA() {
  // CONTEXT -----------------------------------------------
  // -------------------------------------------------------
  const _GlobalContext = useContext(GlobalContext);
  const { showBoxC, setShowBoxC, modalIsOpen, modalContent, modalType, resetModal } = _GlobalContext!;

  // MEDIA QUERIES -----------------------------------------
  // -------------------------------------------------------
  const isMobileScreen = useMediaQuery({ query: "(max-width: 600px)" });
  (function closeBoxCIfIEnlargeTheScreenWhileBeingAVeryOCDDeveloperThankYouBye() {
    // bad state partial fix
    if (showBoxC) {
      !isMobileScreen && setShowBoxC(false);
    }
  })();
  return (
    <div className={styles.boxA}>
      <Modal modalType={modalType} modalIsOpen={modalIsOpen} resetModal={resetModal} modalContent={modalContent} />
      <BoxB />
      {showBoxC && <BoxC />}
      <BoxD />
    </div>
  );
}
