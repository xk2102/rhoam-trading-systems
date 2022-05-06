export type moneyManagement = {
  tradingEquity: number;
  profitToLossRatio: number;
  lotSize: number;
  riskPerTrade: number;
};

export type ticket = {
  id: string;
  date: string;
  // MONEY MANAGEMENT
  tradingEquity: number;
  profitToLossRatio: number;
  lotSize: number;
  riskPerTrade: number;
  // TRADE
  symbol: string;
  direction: string;
  entryOrder: number;
  stopOrder: number;
  // OUT
  entryOrderStopOrderDifference: number;
  rate: number;
  units: number;
  contracts: number;
  quantity: number;
  profitTargetOrder: number;
  commission: number;
};

export type trade = {
  id: string;
  date: string;
  // MONEY MANAGEMENT
  tradingEquity: number;
  profitToLossRatio: number;
  lotSize: number;
  riskPerTrade: number;
  // TRADE
  symbol: string;
  direction: string;
  entryOrder: number;
  stopOrder: number;
  // OUT
  entryOrderStopOrderDifference: number;
  rate: number;
  units: number;
  contracts: number;
  quantity: number;
  profitTargetOrder: number;
  commission: number;
  // FILLS INPUTS
  entryFill: number;
  stopFill: number;
  profitTargetFill: number;
  exitFill: number;
  // FILLS OUTPUTS
  entrySlippage: number;
  stopSlippage: number;
  profitTargetSlippage: number;
  sum: number;
  totalSum: number;
};
