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

export type results = {
  dates: string[];
  dailySums: number[];
  dailyEquity: number[];
  dailyDrawdown: number[];
  totalEntryFills: number;
  totalStopFills: number;
  totalProfitTargetFills: number;
  totalExitFills: number;
  totalWins: number;
  totalLosses: number;
  totalWinsDollars: number;
  totalLossesDollars: number;
  totalCommissions: number;
  totalWinsPercentage: number;
  totalLossesPercentage: number;
  profitFactor: number;
  profitFactorWithCommissions: number;
  totalEntrySlippage: number;
  totalStopSlippage: number;
  totalProfitTargetSlippage: number;
  startingDate: string;
  endingDate: string;
  startingBalance: number;
  endingBalance: number;
  activeMonths: number;
  activeYears: number;
  cagr: number;
  maximumDrawdown: number;
  mar: number;
};
