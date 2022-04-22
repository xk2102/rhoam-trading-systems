// CSS
import { Routes, Route } from "react-router-dom";
import styles from "./ForwardTests.module.css";
import CreateTicket from "./ForwardTests/CreateTicket";
import Info from "./ForwardTests/Info";
import ViewPerformance from "./ForwardTests/ViewPerformance";
import ViewTickets from "./ForwardTests/ViewTickets";

export default function ForwardTests() {
  return (
    <div className={styles.forwardTests}>
      <h1>Forward-tests</h1>

      <Routes>
        <Route path="/" element={<Info />}></Route>
        <Route path="createTicket" element={<CreateTicket />}></Route>
        <Route path="viewTickets" element={<ViewTickets />}></Route>
        <Route path="viewPerformance" element={<ViewPerformance />}></Route>
      </Routes>
    </div>
  );
}
