import { useState, useContext } from "react";
import { symbols } from "../../../modules/symbols";
import styles from "./CreateTicket.module.css";
import { uid } from "uid";
import { useValidation } from "../../../myHooks/useValidation";
import { emptyInputs } from "../../../modules/empties";
import { useTicketCalculations } from "../../../myHooks/useTicketCalculations";
import { toUSD } from "../../../modules/rates";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function CreateTicket() {
  const { validate_createTicket_step1ToStep2, validate_createTicket_step2ToStep3 } = useValidation();
  const { calculateEntryOrderStopOrderDifference, calculateRate, calculateUnits, calculateContracts, calculateQuantity, calculateProfitTargetOrder, calculateCommission } = useTicketCalculations();
  const [step, setStep] = useState<number>(1);
  const [inputs, setInputs] = useState({
    id: uid(),
    date: "",
    // MONEY MANAGEMENT
    tradingEquity: 100000,
    profitToLossRatio: 2,
    lotSize: 25000,
    riskPerTrade: 0.005,
    // TRADE
    symbol: "",
    direction: "LONG",
    entryOrder: 1.4036,
    stopOrder: 1.40099,
  });
  const [outputs, setOutputs] = useState({ entryOrderStopOrderDifference: 0, rate: 0, units: 0, contracts: 0, quantity: 0, profitTargetOrder: 0, commission: 0 });
  const [error, setError] = useState<string>("");
  const _GlobalContext = useContext(GlobalContext);
  const { tickets, setTickets } = _GlobalContext!;
  const navigate = useNavigate();
  // // ----------------------------------------------------------------
  // // -- FORM HANDLERS -----------------------------------------------
  // // ----------------------------------------------------------------
  function onChange_handleTicket(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    switch (event.target.name) {
      case "date":
        setInputs((prevInputs) => ({ ...prevInputs, [event.target.name]: event.target.value }));
        break;
      case "riskPerTrade":
        setInputs((prevInputs) => ({
          ...prevInputs,
          [event.target.name]: parseFloat(event.target.value),
        }));
        break;
      case "lotSize":
      case "tradingEquity":
      case "profitToLossRatio":
        setInputs((prevInputs) => ({
          ...prevInputs,
          [event.target.name]: parseInt(event.target.value, 10),
        }));
        break;
      case "symbol":
      case "direction":
        setInputs((prevInputs) => ({ ...prevInputs, [event.target.name]: event.target.value }));
        break;
      case "entryOrder":
      case "stopOrder":
        setInputs((prevInputs) => ({
          ...prevInputs,
          [event.target.name]: parseFloat(event.target.value),
        }));
        break;
      default:
      // default
    }
  }
  function step1ToStep2() {
    const _error = validate_createTicket_step1ToStep2(inputs.date, inputs.tradingEquity, inputs.profitToLossRatio, inputs.lotSize, inputs.riskPerTrade);
    if (_error !== "") {
      setError(_error);
    } else {
      setError("");
      step <= 2 && setStep(step + 1);
    }
  }
  function clearStep1() {
    setInputs(emptyInputs);
    setError("");
  }
  function step2ToStep3() {
    const _error = validate_createTicket_step2ToStep3(inputs.symbol, inputs.direction, inputs.entryOrder, inputs.stopOrder);
    if (_error !== "") {
      setError(_error);
    } else {
      setError("");

      const d = calculateEntryOrderStopOrderDifference(inputs.entryOrder, inputs.stopOrder);
      const r = calculateRate(inputs.symbol, toUSD);
      const u = calculateUnits(d, r, inputs.tradingEquity, inputs.riskPerTrade);
      const c = calculateContracts(u, inputs.lotSize);
      const q = calculateQuantity(c, inputs.lotSize);
      // prettier-ignore
      const p = calculateProfitTargetOrder(q, r, inputs.direction, inputs.entryOrder, 
        inputs.tradingEquity, inputs.riskPerTrade, inputs.profitToLossRatio);
      const com = parseFloat(calculateCommission(q).toFixed(1));

      setOutputs({ entryOrderStopOrderDifference: d, rate: r, units: u, contracts: c, quantity: q, profitTargetOrder: p, commission: com });

      step <= 2 && setStep(step + 1);
    }
  }
  function onClick_saveTicket() {
    const t = { ...inputs, ...outputs };
    const _tickets = [...tickets, t];
    setTickets(_tickets);
    setInputs(emptyInputs);
    // setStep(1);
    navigate("/forwardTests");
  }
  // // ----------------------------------------------------------------
  // // -- HELPER FUNCTIONS---------------------------------------------
  // // ----------------------------------------------------------------
  // function getDate() {
  //   let d = new Date();
  //   let n = d.toISOString().slice(0, 10).replaceAll("-", "");
  //   return n;
  // }
  const renderStep1 = () => {
    return (
      <div className={`animate ${styles.step}`}>
        {/* ---------------------------------------------- */}
        {/* TOP---------------------------------- */}
        {/* ---------------------------------------------- */}
        <div className={styles.top}>
          <div className={styles.labelInputGroup}>
            <label>Date (YYYYMMDD): </label>
            <input required name="date" type="date" value={inputs.date} onChange={(event) => onChange_handleTicket(event)}></input>
          </div>
          <div className={styles.labelInputGroup}>
            <label>Trading equity ($): </label>
            <input name="tradingEquity" type="number" value={inputs.tradingEquity} onChange={(event) => onChange_handleTicket(event)}></input>
          </div>
          <div className={styles.labelInputGroup}>
            <label>P/L ratio: </label>
            <input name="profitToLossRatio" type="number" value={inputs.profitToLossRatio} onChange={(event) => onChange_handleTicket(event)}></input>
          </div>
          <div className={styles.labelInputGroup}>
            <label>Lot size: </label>
            <input name="lotSize" type="number" value={inputs.lotSize} onChange={(event) => onChange_handleTicket(event)}></input>
          </div>
          <div className={styles.labelInputGroup}>
            <label>Risk per trade: </label>
            <input name="riskPerTrade" type="number" value={inputs.riskPerTrade} onChange={(event) => onChange_handleTicket(event)}></input>
          </div>
          <p className={`animate ${styles.error}`}>{error}</p>
        </div>
        {/* ---------------------------------------------- */}
        {/* BOTTOM---------------------------------- */}
        {/* ---------------------------------------------- */}
        <div className={styles.bottom}>
          <div className={styles.buttonGroup}>
            {step === 1 && (
              <button onClick={() => clearStep1()}>
                <p>CLEAR</p>
              </button>
            )}
            {step !== 1 && (
              <button onClick={() => setStep(step - 1)}>
                <p>BACK</p>
              </button>
            )}
            <button onClick={() => step1ToStep2()}>
              <p>NEXT</p>
            </button>
          </div>
        </div>
      </div>
    );
  };
  const renderStep2 = () => {
    return (
      <div className={`animate ${styles.step}`}>
        {/* ---------------------------------------------- */}
        {/* TOP---------------------------------- */}
        {/* ---------------------------------------------- */}

        <div className={styles.top}>
          <div className={styles.labelInputGroup}>
            <label>Symbol: </label>
            <select name="symbol" value={inputs.symbol} onChange={(event) => onChange_handleTicket(event)}>
              <option style={{ fontFamily: "Verdana" }} value={""}>
                select symbol..!
              </option>
              {symbols.map((symbol, index) => (
                <option key={index} style={{ fontFamily: "Verdana" }} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.labelInputGroup}>
            <label>Direction: </label>
            <select name="direction" value={inputs.direction} onChange={(event) => onChange_handleTicket(event)}>
              <option style={{ fontFamily: "Verdana" }} value="LONG">
                LONG
              </option>
              <option style={{ fontFamily: "Verdana" }} value="SHORT">
                SHORT
              </option>
            </select>
          </div>
          <div className={styles.labelInputGroup}>
            <label>Entry order: </label>
            <input name="entryOrder" type="number" placeholder="Entry order.." value={inputs.entryOrder} onChange={(event) => onChange_handleTicket(event)}></input>
          </div>
          <div className={styles.labelInputGroup}>
            <label>Stop order: </label>
            <input name="stopOrder" type="number" placeholder="Stop order.." value={inputs.stopOrder} onChange={(event) => onChange_handleTicket(event)}></input>
          </div>
          <p className={`animate ${styles.error}`}>{error}</p>
        </div>
        {/* ---------------------------------------------- */}
        {/* BOTTOM---------------------------------- */}
        {/* ---------------------------------------------- */}
        <div className={styles.bottom}>
          <div className={styles.buttonGroup}>
            {step === 1 && (
              <button>
                <p>CLEAR</p>
              </button>
            )}
            {step !== 1 && (
              <button onClick={() => setStep(step - 1)}>
                <p>BACK</p>
              </button>
            )}
            <button onClick={() => step2ToStep3()}>
              <p>NEXT</p>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className={`animate ${styles.step}`}>
        {/* ---------------------------------------------- */}
        {/* TOP---------------------------------- */}
        {/* ---------------------------------------------- */}

        <div className={styles.top}>
          <h3>Save this ticket..?</h3>
          <div className={styles.labelValueGroup}>
            <label>Date (YYYYMMDD): </label>
            <span>{inputs.date}</span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>Trading equity ($): </label>
            <span>{inputs.tradingEquity}</span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>P/L ratio: </label>
            <span>{inputs.profitToLossRatio}</span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>Lot size: </label>
            <span>{inputs.lotSize}</span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>Risk per trade: </label>
            <span>{inputs.riskPerTrade}</span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>Symbol: </label>
            <span>{inputs.symbol}</span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>Direction: </label>
            <span>{inputs.direction}</span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>Entry order: </label>
            <span>{inputs.entryOrder}</span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>Stop order: </label>
            <span>{inputs.stopOrder}</span>
          </div>
          <hr></hr>
          <div className={styles.labelValueGroup}>
            <label>Entry-stop entryOrderStopOrderDifference: </label>
            <span> {outputs.entryOrderStopOrderDifference} </span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>Rate: </label>
            <span> {outputs.rate} </span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>Unit: </label>
            <span> {outputs.units} </span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>Contracts: </label>
            <span> {outputs.contracts} </span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>Quantity: </label>
            <span> {outputs.quantity} </span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>Profit target order: </label>
            <span> {outputs.profitTargetOrder} </span>
          </div>
          <div className={styles.labelValueGroup}>
            <label>Commission: </label>
            <span> {outputs.commission} </span>
          </div>
        </div>
        {/* ---------------------------------------------- */}
        {/* BOTTOM---------------------------------- */}
        {/* ---------------------------------------------- */}
        <div className={styles.bottom}>
          <div className={styles.buttonGroup}>
            <button onClick={() => setStep(step - 1)}>
              <p>BACK</p>
            </button>
            <button onClick={() => onClick_saveTicket()}>
              <p>SAVE TICKET</p>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.createTicket}>
      <h2>CreateTicket ({step}/3)</h2>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
}
