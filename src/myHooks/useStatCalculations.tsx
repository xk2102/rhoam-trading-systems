import { trade } from "../modules/types";

export const useStatCalculations = () => {
  const calculateDates = (trades: trade[]): string[] => {
    let dates: string[] = [];
    trades.forEach((trade) => {
      dates.indexOf(trade.date) === -1 && dates.push(trade.date);
    });
    dates.sort();
    return dates;
  };

  const calculateDailySums = (dates: string[], trades: trade[]): number[] => {
    let dailySums: number[] = [];
    dates.forEach((date) => {
      let listOfTodaysTrades = [];
      listOfTodaysTrades = trades.filter((trade) => trade.date === date);
      let todaysSum = 0;
      listOfTodaysTrades.forEach((trade) => {
        todaysSum = todaysSum + trade.totalSum;
      });
      dailySums.push(todaysSum);
    });
    return dailySums;
  };

  const calculateDailyEquity = (dailySums: number[]): number[] => {
    let dailyEquity: number[] = [100000];
    dailySums.forEach((dailySum) => {
      dailyEquity.push(dailyEquity[dailyEquity.length - 1] + dailySum);
    });
    return dailyEquity;
  };

  const calculateDailyDrawdown = (_dailyEquity: number[]) => {
    let dailyDrawdown: number[] = [];
    _dailyEquity.forEach((dailyEquity, index) => {
      if (index === 0) {
        dailyDrawdown.push(0);
      } else {
        let a = _dailyEquity.slice(0, index);
        let maxa = Math.max.apply(null, a);
        let dd = dailyEquity / maxa - 1;
        dd > 0 ? dailyDrawdown.push(0) : dailyDrawdown.push(parseFloat((dd * 100).toFixed(2)));
      }
    });
    return dailyDrawdown;
  };

  const calculateFills = (trades: trade[]): { totalEntryFills: number; totalStopFills: number; totalProfitTargetFills: number; totalExitFills: number } => {
    let totalEntryFills = 0;
    let totalStopFills = 0;
    let totalProfitTargetFills = 0;
    let totalExitFills = 0;

    trades.forEach((trade) => {
      if (trade.entryFill !== 0) {
        totalEntryFills += 1;
      }
      if (trade.stopFill !== 0) {
        totalStopFills += 1;
      }
      if (trade.profitTargetFill !== 0) {
        totalProfitTargetFills += 1;
      }
      if (trade.exitFill !== 0) {
        totalExitFills += 1;
      }
    });
    return { totalEntryFills, totalStopFills, totalProfitTargetFills, totalExitFills };
  };

  const calculateTotals = (
    trades: trade[]
  ): { totalWins: number; totalLosses: number; totalWinsDollars: number; totalLossesDollars: number; totalCommissions: number; totalWinsPercentage: number; totalLossesPercentage: number } => {
    let totalWins = 0;
    let totalLosses = 0;
    let totalWinsDollars = 0;
    let totalLossesDollars = 0;
    let totalCommissions = 0;
    let totalWinsPercentage = 0;
    let totalLossesPercentage = 0;
    trades.forEach((trade) => {
      trade.sum > 0 ? (totalWins += 1) : (totalLosses += 1);
      trade.sum > 0 ? (totalWinsDollars += trade.totalSum) : (totalLossesDollars += trade.totalSum);
      totalCommissions += trade.commission;
    });
    totalWinsPercentage = parseFloat(((totalWins / trades.length) * 100).toFixed(1));
    totalLossesPercentage = parseFloat(((totalLosses / trades.length) * 100).toFixed(1));

    return { totalWins, totalLosses, totalWinsDollars, totalLossesDollars, totalCommissions, totalWinsPercentage, totalLossesPercentage };
  };

  const calculateProfitFactors = (totalWinsDollars: number, totalLossesDollars: number, totalCommissions: number): { profitFactor: number; profitFactorWithCommissions: number } => {
    let profitFactor = 0;
    let profitFactorWithCommissions = 0;
    profitFactor = Math.abs(totalWinsDollars / totalLossesDollars);
    profitFactorWithCommissions = Math.abs(totalWinsDollars / (totalLossesDollars + totalCommissions));

    return { profitFactor, profitFactorWithCommissions };
  };

  const calculateSlippages = (trades: trade[]): { totalEntrySlippage: number; totalStopSlippage: number; totalProfitTargetSlippage: number } => {
    let totalEntrySlippage = 0;
    let totalStopSlippage = 0;
    let totalProfitTargetSlippage = 0;
    let totalSlippage = 0;
    trades.forEach((trade) => {
      totalEntrySlippage += trade.entrySlippage;
      totalStopSlippage += trade.stopSlippage;
      totalProfitTargetSlippage += trade.profitTargetSlippage;
    });
    totalSlippage += totalEntrySlippage + totalStopSlippage + totalProfitTargetSlippage;
    return { totalEntrySlippage, totalStopSlippage, totalProfitTargetSlippage };
  };

  const calculateDatesBalances = (dates: string[], dailyEquity: number[]): { startingDate: string; endingDate: string; startingBalance: number; endingBalance: number } => {
    let startingDate = dates[0];
    let endingDate = dates[dates.length - 1];
    let startingBalance = dailyEquity[0];
    let endingBalance = dailyEquity[dailyEquity.length - 1];

    return { startingDate, endingDate, startingBalance, endingBalance };
  };

  const calculateActiveMonthsYears = (startingDate: string, endingDate: string): { activeMonths: number; activeYears: number } => {
    let _dateFrom = new Date(parseInt(startingDate.substring(0, 4)), parseInt(startingDate.substring(5, 7)));
    let _dateTo = new Date(parseInt(endingDate.substring(0, 4)), parseInt(endingDate.substring(5, 7)));
    let activeMonths = _dateTo.getMonth() - _dateFrom.getMonth() + 12 * (_dateTo.getFullYear() - _dateFrom.getFullYear()) - 1;
    let activeYears = activeMonths / 12;
    return { activeMonths, activeYears };
  };

  const calculateCagr = (startingBalance: number, endingBalance: number, activeYears: number): number => {
    const cagr = parseFloat((Math.pow(endingBalance / startingBalance, 1 / activeYears) - 1).toFixed(4));
    return cagr;
  };
  const calculateMaximumDrawdown = (dailyDrawdown: number[]): number => {
    const maximumDrawdown = Math.min.apply(null, dailyDrawdown); // min because of negative numbers
    return maximumDrawdown;
  };
  const calculateMar = (cagr: number, maximumDrawdown: number): number => {
    const mar = parseFloat(Math.abs(cagr / maximumDrawdown).toFixed(4));
    return mar;
  };

  return {
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
  };
};
