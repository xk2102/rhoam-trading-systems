import styles from "./ViewPerformance.module.css";
import { useStatCalculations } from "../../../myHooks/useStatCalculations";
// CONTEXT
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { results } from "../../../modules/types";
import MyChart from "./Charts/MyChart";

export default function ViewPerformance() {
  // CONTEXT
  const _GlobalContext = useContext(GlobalContext);
  const { trades } = _GlobalContext!;

  const [results, setResults] = useState<results | null>();

  const {
    calculateDates,
    calculateDailySums,
    calculateDailyEquity,
    calculateDailyDrawdown,
    calculateFills,
    calculateTotals,
    calculateProfitFactors,
    calculateSlippages,
    calculateDatesBalances,
    calculateActiveMonthsYears,
    calculateCagr,
    calculateMaximumDrawdown,
    calculateMar,
  } = useStatCalculations();

  const runOnMount = () => {
    if (trades.length > 0) {
      const dates = calculateDates(trades);
      const dailySums = calculateDailySums(dates, trades);
      const dailyEquity = calculateDailyEquity(dailySums);
      const dailyDrawdown = calculateDailyDrawdown(dailyEquity);
      const { totalEntryFills, totalStopFills, totalProfitTargetFills, totalExitFills } = calculateFills(trades);
      const { totalWins, totalLosses, totalWinsDollars, totalLossesDollars, totalCommissions, totalWinsPercentage, totalLossesPercentage } = calculateTotals(trades);
      const { profitFactor, profitFactorWithCommissions } = calculateProfitFactors(totalWinsDollars, totalLossesDollars, totalCommissions);
      const { totalEntrySlippage, totalStopSlippage, totalProfitTargetSlippage } = calculateSlippages(trades);
      const { startingDate, endingDate, startingBalance, endingBalance } = calculateDatesBalances(dates, dailyEquity);
      const { activeMonths, activeYears } = calculateActiveMonthsYears(startingDate, endingDate);
      const cagr = calculateCagr(startingBalance, endingBalance, activeYears);
      const maximumDrawdown = calculateMaximumDrawdown(dailyDrawdown);
      const mar = calculateMar(cagr, maximumDrawdown);

      setResults({
        dates,
        dailySums,
        dailyEquity,
        dailyDrawdown,
        totalEntryFills,
        totalStopFills,
        totalProfitTargetFills,
        totalExitFills,
        totalWins,
        totalLosses,
        totalWinsDollars,
        totalLossesDollars,
        totalCommissions,
        totalWinsPercentage,
        totalLossesPercentage,
        profitFactor,
        profitFactorWithCommissions,
        totalEntrySlippage,
        totalStopSlippage,
        totalProfitTargetSlippage,
        startingDate,
        endingDate,
        startingBalance,
        endingBalance,
        activeMonths,
        activeYears,
        cagr,
        maximumDrawdown,
        mar,
      });
    }
  };

  // eslint-disable-next-line
  useEffect(() => runOnMount(), []);

  return (
    <div className={styles.viewPerformance}>
      <h2>View performance</h2>

      {results && (
        <>
          <MyChart setA={results.dates} setB={results.dailyEquity} label={"Daily equity"}></MyChart>
          <MyChart setA={results.dates} setB={results.dailyDrawdown} label={"Daily drawdown"}></MyChart>
          <p>Stats & metrics</p>
          <Group left={"Total entry fills"} middle={results.totalEntryFills} />
          <Group left={"Total stop fills"} middle={results.totalStopFills} />
          <Group left={"Total profit target fills"} middle={results.totalProfitTargetFills} />
          <Group left={"Total exit fills"} middle={results.totalExitFills} hasBottomMargin={true} />
          <br></br>
          <Group left={"Total wins"} middle={results.totalWins} right={`${results.totalWinsPercentage.toFixed(2)} %`} />
          <Group left={"Total losses"} middle={results.totalLosses} right={`${results.totalLossesPercentage.toFixed(2)} %`} />
          <Group left={"Total missed"} middle={0} right={"0 %"} hasBottomMargin={true} />
          <br></br>
          <Group left={"Total wins ($)"} middle={`${results.totalWinsDollars.toFixed(0)} $`} />
          <Group left={"Total losses ($)"} middle={`${results.totalLossesDollars.toFixed(0)} $`} hasBottomMargin={true} />
          <br></br>
          <Group left={"Profit factor"} middle={results.profitFactor.toFixed(2)} hasBottomMargin={true} />
          <br></br>
          <Group left={"Total commissions ($)"} middle={`${results.totalCommissions.toFixed(0)}`} />
          <Group left={"Profit factor (w/commissions)"} middle={results.profitFactorWithCommissions.toFixed(2)} hasBottomMargin={true} />
          <br></br>
          <Group left={"Total entry fill slippage ($)"} middle={`${results.totalEntrySlippage} $`} />
          <Group left={"Total stop fill slippage ($)"} middle={`${results.totalStopSlippage} $`} />
          <Group left={"Total profit target fill slippage ($)"} middle={`${results.totalProfitTargetSlippage} $`} />
          <Group left={"Total slippage ($)"} middle={`${results.totalEntrySlippage + results.totalStopSlippage + results.totalProfitTargetSlippage} $`} hasBottomMargin={true} />
          <br></br>
          <Group left={"Starting date"} middle={results.startingDate} />
          <Group left={"Ending date"} middle={results.endingDate} hasBottomMargin={true} />
          <br></br>
          <Group left={"Active months"} middle={results.activeMonths} />
          <Group left={"Active years"} middle={results.activeYears} hasBottomMargin={true} />
          <br></br>
          <Group left={"Starting balance ($)"} middle={`${results.startingBalance.toFixed(0)} $`} />
          <Group left={"Ending balance ($)"} middle={`${results.endingBalance.toFixed(0)} $`} hasBottomMargin={true} />
          <br></br>
          <Group left={"CAGR"} middle={results.cagr} />
          <Group left={"Maximum drawdown"} middle={`${results.maximumDrawdown} %`} />
          <Group left={"MAR"} middle={results.mar} />
        </>
      )}
    </div>
  );
}

const Group: React.FC<{ left: string; middle: string | number; right?: string | number; hasBottomMargin?: boolean }> = (props) => {
  const { left, middle, right, hasBottomMargin } = props;
  return (
    <div className={styles.group} style={hasBottomMargin ? { marginBottom: "20px" } : {}}>
      <div className={styles.left}>
        <span>{left}</span>
      </div>
      <div className={styles.middle}>
        <span>{middle}</span>
      </div>
      {right && (
        <div className={styles.right}>
          <span>{right}</span>
        </div>
      )}
    </div>
  );
};
