import { trade } from "../../../modules/types";
import styles from "./Trade.module.css";
import { useNavigate } from "react-router-dom";
import { useLongPress } from "react-use";
import { useState } from "react";
// CONTEXT
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";

const Ticket: React.FC<{ trade: trade }> = (props) => {
  const navigate = useNavigate();
  const { trade } = props;
  const [expand, setExpand] = useState<boolean>(false);
  // CONTEXT
  const _GlobalContext = useContext(GlobalContext);
  const { setSelectedTrade } = _GlobalContext!;
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
    setSelectedTrade(trade);
    navigate(`${trade.id}`);
  };
  return (
    <div {...longPressEvent} className={styles.trade} key={trade.id} onDoubleClick={() => onDoubleClick()}>
      <p>{`🠶 ${trade.date} - ${trade.symbol} - ${trade.direction} - ${trade.quantity} `}</p>
      {expand && (
        <>
          <p>expand</p>
        </>
      )}
    </div>
  );
};

export default Ticket;
