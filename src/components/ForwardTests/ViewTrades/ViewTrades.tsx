// CSS
import styles from "./ViewTrades.module.css";
// CONTEXT
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
// COMPONENTS
import Trade from "./Trade";
import { Routes, Route } from "react-router-dom";
import TradeDetailed from "./TradeDetailed";

export default function ViewTrade() {
  return (
    <div className={styles.viewTrades}>
      <h2>View trades</h2>
      <Routes>
        <Route path="/" element={<TradesList />}></Route>
        <Route path=":tradeId" element={<TradeDetailed />}></Route>
      </Routes>
    </div>
  );
}

const TradesList = () => {
  // CONTEXT
  const _GlobalContext = useContext(GlobalContext);
  const { trades } = _GlobalContext!;
  return (
    <>
      <p id="tip">tip: press and hold to expand a trade or double click to edit it..!</p>
      {trades.length > 0 && trades.map((trade) => <Trade key={trade.id} trade={trade} />)}
    </>
  );
};
