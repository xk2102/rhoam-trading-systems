// CSS
import styles from "./BackTests.module.css";
// LIBRARIES ---------------------------------------------
import { useMediaQuery } from "react-responsive";
import { IoMdConstruct } from "react-icons/io";

export default function BackTests() {
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
      return <IoMdConstruct size={90} />;
    } else if (largerThan2500) {
      return <IoMdConstruct size={80} />;
    } else if (largerThan1900) {
      return <IoMdConstruct size={70} />;
    } else if (largerThan1200) {
      return <IoMdConstruct size={60} />;
    } else if (largerThan900) {
      return <IoMdConstruct size={50} />;
    } else {
      return <IoMdConstruct size={40} />;
    }
  }
  return (
    <div className={styles.backTests}>
      <h1>Back-tests</h1>
      <div className={styles.uc}>
        {renderLogoAccordingToSize()}
        <h1>UNDER DEVELOPMENT</h1>
      </div>
    </div>
  );
}
