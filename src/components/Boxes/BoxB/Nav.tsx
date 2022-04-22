// CSS----------------------------------------------------
import styles from "./Nav.module.css";
// LIBRARIES ---------------------------------------------
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
// REACT -------------------------------------------------
import { useContext } from "react";
// CONTEXT -----------------------------------------------
import { GlobalContext } from "../../../contexts/GlobalContext";
// COMPONENTS --------------------------------------------
import NavIcon from "./NavIcon";

export default function Nav() {
  // CONTEXT -----------------------------------------------
  // -------------------------------------------------------
  const _GlobalContext = useContext(GlobalContext);
  const { showBoxC, setShowBoxC } = _GlobalContext!;

  // MEDIA QUERIES -----------------------------------------
  // -------------------------------------------------------
  const isBiggerThan600 = useMediaQuery({ minWidth: 600 });
  if (!isBiggerThan600) {
    return (
      <div className={styles.nav} onClick={() => setShowBoxC(!showBoxC)}>
        <NavIcon />
      </div>
    );
  } else {
    return (
      <div className={styles.nav}>
        <NavList />
      </div>
    );
  }
}

function NavList() {
  const { pathname } = useLocation();
  return (
    <div className={`animate ${styles.navList}`}>
      <div className={pathname === "/" ? `${styles.navItem} ${styles.active}` : `${styles.navItem}`}>
        <Link to="/">Home</Link>
      </div>
      <div className={pathname.includes("/backTests") ? `${styles.navItem} ${styles.active}` : `${styles.navItem}`}>
        <Link to="/backTests">Back-tests</Link>
      </div>
      <div className={pathname.includes("/forwardTests") ? `${styles.navItem} ${styles.active}` : `${styles.navItem}`}>
        <Link to="/forwardTests">Forward-tests</Link>
      </div>
    </div>
  );
}
