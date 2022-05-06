export const useTicketFillsCalculations = () => {
  const calculateEntrySlippage = (direction: string, entryOrder: number, entryFill: number, quantity: number, rate: number): number => {
    let sl;
    if (direction === "LONG") {
      sl = (entryOrder - entryFill) * quantity * rate;
    } else {
      sl = (entryFill - entryOrder) * quantity * rate;
    }
    return sl;
  };
  const calculateStopSlippage = (direction: string, stopOrder: number, stopFill: number, quantity: number, rate: number): number => {
    let sl;
    if (direction === "LONG") {
      sl = (stopFill - stopOrder) * quantity * rate;
    } else {
      sl = (stopOrder - stopFill) * quantity * rate;
    }
    return sl;
  };
  const calculateProfitTargetSlippage = (direction: string, profitTargetOrder: number, profitTargetFill: number, quantity: number, rate: number): number => {
    let sl;
    if (direction === "LONG") {
      sl = (profitTargetFill - profitTargetOrder) * quantity * rate;
    } else {
      sl = (profitTargetOrder - profitTargetFill) * quantity * rate;
    }
    return sl;
  };
  const calculateSum = (direction: string, entry: number, exit: number, quantity: number, rate: number): number => {
    let sum;
    if (direction === "LONG") {
      //exitprice - entryprice
      sum = (exit - entry) * quantity * rate;
    } else {
      sum = (entry - exit) * quantity * rate;
    }
    return sum;
  };
  const isZeroOrNan = (number: number): boolean => {
    if (number === 0 || isNaN(number)) {
      return true;
    } else {
      return false;
    }
  };
  const whatTypeOfTradeIsIt = (inputs: { entryFill: number; stopFill: number; profitTargetFill: number; exitFill: number }): string => {
    const { entryFill, stopFill, profitTargetFill, exitFill } = inputs;
    if (!isZeroOrNan(entryFill) && !isZeroOrNan(stopFill) && isZeroOrNan(profitTargetFill) && isZeroOrNan(exitFill)) {
      return "entry-stop";
    }
    if (!isZeroOrNan(entryFill) && isZeroOrNan(stopFill) && !isZeroOrNan(profitTargetFill) && isZeroOrNan(exitFill)) {
      return "entry-profitTarget";
    }
    if (!isZeroOrNan(entryFill) && isZeroOrNan(stopFill) && isZeroOrNan(profitTargetFill) && !isZeroOrNan(exitFill)) {
      return "entry-exit";
    }
    return "input fills error";
  };

  return { whatTypeOfTradeIsIt, calculateEntrySlippage, calculateStopSlippage, calculateProfitTargetSlippage, calculateSum };
};
