import styles from "./App.module.css";
import BoxA from "./components/Boxes/BoxA";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <BoxA />
      </BrowserRouter>
    </div>
  );
}
