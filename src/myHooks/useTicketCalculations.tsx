export const useTicketCalculations = () => {
  const calculateEntryOrderStopOrderDifference = (entryOrder: number, stopOrder: number): number => {
    return parseFloat(Math.abs(entryOrder - stopOrder).toFixed(5));
  };
  const calculateRate = (
    symbol: string,
    toUSD: {
      symbol: string;
      rate: number;
    }[]
  ): number => {
    let quote = symbol.substring(symbol.length - 3);
    let r = toUSD.find((o) => o.symbol === quote);
    return r!.rate;
  };
  const calculateUnits = (entryOrderStopOrderDifference: number, rate: number, tradingEquity: number, riskPerTrade: number): number => {
    return parseInt(((tradingEquity * riskPerTrade) / (entryOrderStopOrderDifference * rate)).toFixed(0));
  };
  const calculateContracts = (units: number, lotSize: number): number => {
    return Math.trunc(units / lotSize);
  };
  const calculateQuantity = (contracts: number, lotSize: number): number => {
    return contracts * lotSize;
  };
  const calculateProfitTargetOrder = (quantity: number, rate: number, direction: string, entryOrder: number, tradingEquity: number, riskPerTrade: number, profitToLossRatio: number): number => {
    if (direction === "LONG") {
      let p = (entryOrder + (tradingEquity * riskPerTrade * profitToLossRatio) / (quantity * rate)).toFixed(5);
      return parseFloat(p);
    } else {
      let p = (entryOrder - (tradingEquity * riskPerTrade * profitToLossRatio) / (quantity * rate)).toFixed(5);
      return parseFloat(p);
    }
  };
  const calculateCommission = (quantity: number): number => {
    let com = 2 * Math.max(2, 0.2 * 0.0001 * quantity);
    return -1 * com;
  };
  return { calculateEntryOrderStopOrderDifference, calculateRate, calculateUnits, calculateContracts, calculateQuantity, calculateProfitTargetOrder, calculateCommission };
};
