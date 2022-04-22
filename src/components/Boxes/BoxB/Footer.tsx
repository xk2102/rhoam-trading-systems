// CSS
import styles from "./Footer.module.css";
// LIBRARIES
import { MdOutlineCopyright } from "react-icons/md";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <a href="https://www.christoskipouros.com" target="_blank" rel="noreferrer">
        <MdOutlineCopyright /> C.K 2022
      </a>
    </div>
  );
}
