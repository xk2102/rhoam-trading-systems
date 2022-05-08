// CSS, REACT ICONS --------------------------------------
import styles from "./Logo.module.css";
import { FcAreaChart } from "react-icons/fc";
// LIBRARIES ---------------------------------------------
import { useMediaQuery } from "react-responsive";
// COMPONENT----------------------------------------------
export default function Logo() {
  // const largerThan600 = useMediaQuery({ query: "(min-width: 600px)" }); // MOBILE
  const largerThan900 = useMediaQuery({ query: "(min-width: 900px)" }); // TABLET
  const largerThan1200 = useMediaQuery({ query: "(min-width: 1200px)" }); // HD
  const largerThan1900 = useMediaQuery({ query: "(min-width: 1900px)" }); // FHD
  const largerThan2500 = useMediaQuery({ query: "(min-width: 2500px)" }); // UHD
  const largerThan3800 = useMediaQuery({ query: "(min-width: 3800px)" }); // QHD
  // -----------------------------------------------------------
  // RENDERS----------------------------------------------------
  // -----------------------------------------------------------
  function renderLogoAccordingToSize() {
    if (largerThan3800) {
      return <FcAreaChart size={90} />;
    } else if (largerThan2500) {
      return <FcAreaChart size={80} />;
    } else if (largerThan1900) {
      return <FcAreaChart size={70} />;
    } else if (largerThan1200) {
      return <FcAreaChart size={60} />;
    } else if (largerThan900) {
      return <FcAreaChart size={50} />;
    } else {
      return <FcAreaChart size={40} />;
    }
  }
  return (
    <div className={styles.logo}>
      <div className={styles.logoIcon}>{renderLogoAccordingToSize()}</div>
      <div className={styles.logoText}>RHOAM TRADING SYSTEMS [demo version]</div>
    </div>
  );
}
