import { uid } from "uid";

export const emptyTicket = {
  id: uid(),
  date: "",
  // MONEY MANAGEMENT
  tradingEquity: 0,
  profitToLossRatio: 0,
  lotSize: 0,
  riskPerTrade: 0,
  // TRADE
  symbol: "",
  direction: "",
  entryOrder: 0,
  stopOrder: 0,
  entryOrderStopOrderDifference: 0,
  rate: 0,
  units: 0,
  contracts: 0,
  quantity: 0,
  profitTargetOrder: 0,
  commission: 0,
};

export const emptyInputs = {
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
};
