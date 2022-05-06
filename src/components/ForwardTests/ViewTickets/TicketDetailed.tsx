import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TicketDetailed.module.css";
// CONTEXT
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { useTicketFillsCalculations } from "../../../myHooks/useTicketFillsCalculations";

const TicketDetailed: React.FC<{}> = (props) => {
  const {} = props;
  // CONTEXT
  const _GlobalContext = useContext(GlobalContext);
  const { selectedTicket, setSelectedTicket, trades, setTrades, deleteTicketById } = _GlobalContext!;
  const ticket = selectedTicket!;
  const { whatTypeOfTradeIsIt, calculateEntrySlippage, calculateStopSlippage, calculateProfitTargetSlippage, calculateSum } = useTicketFillsCalculations();
  const [error, setError] = useState<string>("");
  // ROUTER NAVIGATION
  const navigate = useNavigate();
  let params = useParams();
  // STATE
  const [inputs, setInputs] = useState({
    entryFill: 0,
    stopFill: 0,
    profitTargetFill: 0,
    exitFill: 0,
  });
  const [outputs, setOutputs] = useState({
    entrySlippage: 0,
    stopSlippage: 0,
    profitTargetSlippage: 0,
    sum: 0,
    totalSum: 0,
  });
  const emptyInputs = {
    entryFill: 0,
    stopFill: 0,
    profitTargetFill: 0,
    exitFill: 0,
  };
  const emptyOutputs = { entrySlippage: 0, stopSlippage: 0, profitTargetSlippage: 0, sum: 0, totalSum: 0 };

  function onChange_handleInputs(event: React.ChangeEvent<HTMLInputElement>) {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: parseFloat(event.target.value),
    }));
  }
  const onClick_back = (): void => {
    setSelectedTicket(null);
    navigate("/forwardTests/viewTickets");
  };
  const onClick_applyFills = (): void => {
    setError("");
    switch (whatTypeOfTradeIsIt(inputs)) {
      case "input fills error":
        setError("input fills error..!");
        break;
      case "entry-stop":
        setOutputs({
          ...emptyOutputs,
          entrySlippage: parseFloat(calculateEntrySlippage(ticket.direction, ticket.entryOrder, inputs.entryFill, ticket.quantity, ticket.rate).toFixed(1)),
          stopSlippage: parseFloat(calculateStopSlippage(ticket.direction, ticket.stopOrder, inputs.stopFill, ticket.quantity, ticket.rate).toFixed(1)),
          sum: parseFloat(calculateSum(ticket.direction, inputs.entryFill, inputs.stopFill, ticket.quantity, ticket.rate).toFixed(1)),
          totalSum: parseFloat(calculateSum(ticket.direction, inputs.entryFill, inputs.stopFill, ticket.quantity, ticket.rate).toFixed(1)) - ticket.commission,
        });
        break;
      case "entry-profitTarget":
        setOutputs({
          ...emptyOutputs,
          entrySlippage: parseFloat(calculateEntrySlippage(ticket.direction, ticket.entryOrder, inputs.entryFill, ticket.quantity, ticket.rate).toFixed(1)),
          profitTargetSlippage: parseFloat(calculateProfitTargetSlippage(ticket.direction, ticket.profitTargetOrder, inputs.profitTargetFill, ticket.quantity, ticket.rate).toFixed(1)),
          sum: parseFloat(calculateSum(ticket.direction, inputs.entryFill, inputs.profitTargetFill, ticket.quantity, ticket.rate).toFixed(1)),
          totalSum: parseFloat(calculateSum(ticket.direction, inputs.entryFill, inputs.profitTargetFill, ticket.quantity, ticket.rate).toFixed(1)) - ticket.commission,
        });
        break;
      case "entry-exit":
        setOutputs({
          ...emptyOutputs,
          entrySlippage: parseFloat(calculateEntrySlippage(ticket.direction, ticket.entryOrder, inputs.entryFill, ticket.quantity, ticket.rate).toFixed(1)),
          sum: parseFloat(calculateSum(ticket.direction, inputs.entryFill, inputs.exitFill, ticket.quantity, ticket.rate).toFixed(1)),
          totalSum: parseFloat(calculateSum(ticket.direction, inputs.entryFill, inputs.exitFill, ticket.quantity, ticket.rate).toFixed(1)) - ticket.commission,
        });
        break;
      default:
      // default
    } // switch
  };
  const onClick_save = (): void => {
    const t = { ...ticket, ...inputs, ...outputs };
    const _trades = [...trades, t];
    setTrades(_trades);
    setInputs(emptyInputs);
    setOutputs(emptyOutputs);
    console.log(ticket.id);
    deleteTicketById(ticket.id);
    navigate("/forwardTests");
  };
  return (
    <div className={styles.ticketDetailed}>
      <div className={styles.top}>
        <h2>{`ticket id: ${params.ticketId}`}</h2>
        <p>
          {`🠶 ${ticket.date} - ${ticket.symbol} - ${ticket.direction} - ${ticket.quantity} `}
          {outputs.totalSum > 0 && (
            <span>
              | TOTAL: <span style={{ color: "#339966" }}> {outputs.totalSum}$</span>
            </span>
          )}
          {outputs.totalSum < 0 && (
            <span>
              | TOTAL: <span style={{ color: "#ff5050" }}> {outputs.totalSum}$</span>
            </span>
          )}
        </p>
        <div className={styles.labelInputGroup}>
          <label>
            {`Entry fill (order @ ${ticket.entryOrder}) `}
            {outputs.entrySlippage > 0 && (
              <span>
                (slippage: <span style={{ color: "#339966" }}>{outputs.entrySlippage}$</span>)
              </span>
            )}
            {outputs.entrySlippage < 0 && (
              <span>
                (slippage: <span style={{ color: "#ff5050" }}>{outputs.entrySlippage}$</span>)
              </span>
            )}
          </label>
          <input name="entryFill" type="number" placeholder="Entry fill.." value={inputs.entryFill} onChange={(event) => onChange_handleInputs(event)}></input>
        </div>
        <div className={styles.labelInputGroup}>
          <label>
            {`Stop fill (order @ ${ticket.stopOrder}) `}
            {outputs.stopSlippage > 0 && (
              <span>
                (slippage: <span style={{ color: "#339966" }}>{outputs.stopSlippage}$</span>)
              </span>
            )}
            {outputs.stopSlippage < 0 && (
              <span>
                (slippage: <span style={{ color: "#ff5050" }}>{outputs.stopSlippage}$</span>)
              </span>
            )}
          </label>
          <input name="stopFill" type="number" placeholder="Stop fill.." value={inputs.stopFill} onChange={(event) => onChange_handleInputs(event)}></input>
        </div>
        <div className={styles.labelInputGroup}>
          <label>
            {`Profit target fill (order @ ${ticket.profitTargetOrder})`}
            {outputs.profitTargetSlippage > 0 && (
              <span>
                (slippage: <span style={{ color: "#339966" }}>{outputs.profitTargetSlippage}$</span>)
              </span>
            )}
            {outputs.profitTargetSlippage < 0 && (
              <span>
                (slippage: <span style={{ color: "#ff5050" }}>{outputs.profitTargetSlippage}$</span>)
              </span>
            )}
          </label>
          <input name="profitTargetFill" type="number" placeholder="Profit target fill.." value={inputs.profitTargetFill} onChange={(event) => onChange_handleInputs(event)}></input>
        </div>
        <div className={styles.labelInputGroup}>
          <label>{`Exit fill`}</label>
          <input name="exitFill" type="number" placeholder="Exit fill.." value={inputs.exitFill} onChange={(event) => onChange_handleInputs(event)}></input>
        </div>

        <p className="animate" style={{ color: "#ff5050" }}>
          {error}
        </p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.buttonGroup}>
          <button onClick={() => onClick_back()}>
            <p>BACK</p>
          </button>
          <button onClick={() => onClick_applyFills()}>
            <p>APPLY FILLS</p>
          </button>
        </div>
        {outputs.totalSum !== 0 && (
          <div className={`animate ${styles.buttonGroup}`}>
            <button onClick={() => onClick_save()}>
              <p>SAVE TRADE</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetailed;
