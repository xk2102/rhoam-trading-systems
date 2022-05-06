// CSS
import styles from "./ViewTickets.module.css";
// CONTEXT
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
// COMPONENTS
import Ticket from "./Ticket";
import { Routes, Route } from "react-router-dom";
import TicketDetailed from "./TicketDetailed";

export default function ViewTickets() {
  return (
    <div className={styles.viewTickets}>
      <h2>View tickets</h2>
      <Routes>
        <Route path="/" element={<TicketsList />}></Route>
        <Route path=":ticketId" element={<TicketDetailed />}></Route>
      </Routes>
    </div>
  );
}

const TicketsList = () => {
  // CONTEXT
  const _GlobalContext = useContext(GlobalContext);
  const { tickets } = _GlobalContext!;
  return (
    <>
      <p id="tip">tip: press and hold to expand a ticket or double click to edit it..!</p>
      {tickets.length > 0 && tickets.map((ticket) => <Ticket key={ticket.id} ticket={ticket} />)}
    </>
  );
};
