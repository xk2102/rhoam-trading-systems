// CSS----------------------------------------------------
import styles from "../../App.module.css";
// LIBRARIES ---------------------------------------------
import { Routes, Route, Navigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
// REACT -------------------------------------------------
// import { useContext } from "react";
// CONTEXT -----------------------------------------------
// import { GlobalContext } from "../../contexts/GlobalContext";
// COMPONENTS --------------------------------------------
import Footer from "./BoxB/Footer";
import Home from "../Home";
import BackTests from "../BackTests";
import ForwardTests from "../ForwardTests";
// FIREBASE ----------------------------------------------
// import FirebaseExamples from "../FirebaseExamples";

export default function BoxD() {
  // CONTEXT -----------------------------------------------
  // -------------------------------------------------------
  // const _GlobalContext = useContext(GlobalContext);
  // const { activateModal } = _GlobalContext!;
  // MEDIA QUERIES -----------------------------------------
  // -------------------------------------------------------
  const isSmallerThan1300 = useMediaQuery({ maxWidth: 1300 });

  return (
    <div className={styles.boxD}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/backTests" element={<BackTests />}></Route>
        <Route path="/forwardTests/*" element={<ForwardTests />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* <button onClick={() => activateModal("hello", "")}>modal</button> */}
      {isSmallerThan1300 && <Footer />}
    </div>
  );
}
