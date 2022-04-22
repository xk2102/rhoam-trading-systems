// CSS----------------------------------------------------
import styles from "../../App.module.css";
// LIBRARIES ---------------------------------------------
import { useMediaQuery } from "react-responsive";
// REACT -------------------------------------------------
// CONTEXT -----------------------------------------------
// COMPONENTS --------------------------------------------
import Footer from "./BoxB/Footer";
import Logo from "./BoxB/Logo";
import Nav from "./BoxB/Nav";

export default function BoxB() {
  const isBiggerThan1300 = useMediaQuery({ minWidth: 1300 });
  function renderLessThan1300() {
    return (
      <div className={styles.boxB}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <Nav />
        </div>
      </div>
    );
  }
  function renderMoreThan1300() {
    return (
      <div className={styles.boxB}>
        <div className={styles.left}>
          <Logo />
          <Nav />
        </div>
        <div className={styles.right}>
          <Footer />
        </div>
      </div>
    );
  }
  return !isBiggerThan1300 ? renderLessThan1300() : renderMoreThan1300();
}
