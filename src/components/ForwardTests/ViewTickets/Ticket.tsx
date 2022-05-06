import { ticket } from "../../../modules/types";
import styles from "./Ticket.module.css";
import { useNavigate } from "react-router-dom";
import { useLongPress } from "react-use";
import { useState } from "react";
// CONTEXT
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";

const Ticket: React.FC<{ ticket: ticket }> = (props) => {
  const navigate = useNavigate();
  const { ticket } = props;
  const [expand, setExpand] = useState<boolean>(false);
  // CONTEXT
  const _GlobalContext = useContext(GlobalContext);
  const { setSelectedTicket } = _GlobalContext!;
  // ---------------------------------------
  // useLongPress---------------------------
  const onLongPress = () => {
    setExpand(!expand);
  };
  const defaultOptions = {
    isPreventDefault: true,
    delay: 1000,
  };
  const longPressEvent = useLongPress(onLongPress, defaultOptions);
  // useLongPress---------------------------
  // ---------------------------------------

  const onDoubleClick = () => {
    setSelectedTicket(ticket);
    navigate(`${ticket.id}`);
  };
  return (
    <div {...longPressEvent} className={styles.ticket} key={ticket.id} onDoubleClick={() => onDoubleClick()}>
      <p>{`🠶 ${ticket.date} - ${ticket.symbol} - ${ticket.direction} - ${ticket.quantity} `}</p>
      {expand && (
        <>
          <p>{`entryOrder: ${ticket.entryOrder}`}</p>
          <p>{`stopOrder: ${ticket.stopOrder}`}</p>
          <p>{`profitTargetOrder: ${ticket.profitTargetOrder}`}</p>
          <p>{`commissions: ${ticket.commission} $`}</p>
        </>
      )}
    </div>
  );
};

export default Ticket;
