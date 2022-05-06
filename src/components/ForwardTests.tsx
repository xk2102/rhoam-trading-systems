// LIBRARIES
import { Routes, Route } from "react-router-dom";
// CSS
import styles from "./ForwardTests.module.css";
// COMPONENTS
import CreateTicket from "./ForwardTests/CreateTickets/CreateTicket";
import Info from "./ForwardTests/Info";
import ViewPerformance from "./ForwardTests/ViewPerformance/ViewPerformance";
import ViewTickets from "./ForwardTests/ViewTickets/ViewTickets";
import ViewTrades from "./ForwardTests/ViewTrades/ViewTrades";

export default function ForwardTests() {
  return (
    <div className={styles.forwardTests}>
      <h1>Forward-tests</h1>
      <Routes>
        <Route path="/" element={<Info />}></Route>
        <Route path="createTicket" element={<CreateTicket />}></Route>
        <Route path="viewTickets/*" element={<ViewTickets />}></Route>
        <Route path="viewTrades/*" element={<ViewTrades />}></Route>
        <Route path="viewPerformance" element={<ViewPerformance />}></Route>
      </Routes>
    </div>
  );
}
