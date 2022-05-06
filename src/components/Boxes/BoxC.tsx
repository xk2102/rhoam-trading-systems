// CSS----------------------------------------------------
import styles from "../../App.module.css";
// LIBRARIES ---------------------------------------------
import { Link, useLocation } from "react-router-dom";
// REACT -------------------------------------------------
import { useContext } from "react";
// CONTEXT -----------------------------------------------
import { GlobalContext } from "../../contexts/GlobalContext";
// COMPONENTS --------------------------------------------
export default function BoxC() {
  // CONTEXT -----------------------------------------------
  // -------------------------------------------------------
  const _GlobalContext = useContext(GlobalContext);
  const { setShowBoxC } = _GlobalContext!;
  // ROUTER ------------------------------------------------
  // -------------------------------------------------------
  const { pathname } = useLocation();

  return (
    <div className={`animate ${styles.boxC}`}>
      <div className={pathname === "/" ? `${styles.navItem} ${styles.active}` : `${styles.navItem}`}>
        <Link to="/" onClick={() => setShowBoxC(false)}>
          Home
        </Link>
      </div>
      <div className={pathname === "/backTests" ? `${styles.navItem} ${styles.active}` : `${styles.navItem}`}>
        <Link to="/backTests" onClick={() => setShowBoxC(false)}>
          Back-tests
        </Link>
      </div>
      <div className={pathname === "/forwardTests" ? `${styles.navItem} ${styles.active}` : `${styles.navItem}`}>
        <Link to="/forwardTests" onClick={() => setShowBoxC(false)}>
          Forward-tests
        </Link>
      </div>
    </div>
  );
}
