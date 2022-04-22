import styles from "./Info.module.css";
import { Link } from "react-router-dom";
// REACT -------------------------------------------------
import { useContext } from "react";
// CONTEXT -----------------------------------------------
import { GlobalContext } from "../../contexts/GlobalContext";

export default function Info() {
  const _GlobalContext = useContext(GlobalContext);
  const { tickets } = _GlobalContext!;

  return (
    <div className={styles.info}>
      <div className={styles.group}>
        <Link to="/forwardTests/createTicket">
          <div className={styles.groupItem}>
            <p>Create a ticket</p>
          </div>
        </Link>
        <Link to="/forwardTests/viewTickets">
          <div className={styles.groupItem}>
            <p>{`View tickets${tickets.length > 0 ? `: ${tickets.length}` : ""}`}</p>
          </div>
        </Link>
        <Link to="/forwardTests/viewPerformance">
          <div className={styles.groupItem}>
            <p>View performance</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
