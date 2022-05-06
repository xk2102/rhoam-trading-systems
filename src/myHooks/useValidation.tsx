export const useValidation = () => {
  const validate_createTicket_step1ToStep2 = (date: string, tradingEquity: number, profitToLossRatio: number, lotSize: number, riskPerTrade: number): string => {
    if (date === "") {
      return "Please select a valid date..!";
    }
    if (tradingEquity === 0 || isNaN(tradingEquity)) {
      return "tradingEquity error..!";
    }
    if (profitToLossRatio <= 0 || isNaN(profitToLossRatio)) {
      return "profitToLossRatio error..!";
    }
    if (lotSize <= 0 || isNaN(lotSize)) {
      return "lotSize error..!";
    }
    if (riskPerTrade <= 0 || isNaN(riskPerTrade)) {
      return "riskPerTrade error..!";
    }
    return "";
  };
  const validate_createTicket_step2ToStep3 = (symbol: string, direction: string, entryOrder: number, stopOrder: number): string => {
    if (symbol === "") {
      return "symbol error..!";
    }
    if (direction === "") {
      return "direction error..!";
    }
    if (entryOrder <= 0 || isNaN(entryOrder)) {
      return "entryOrder error..!";
    }
    if (stopOrder <= 0 || isNaN(stopOrder)) {
      return "stopOrder error..!";
    }
    if (direction === "LONG" && stopOrder > entryOrder) {
      return "stopOrder cannnot be above the entryOrder";
    }
    if (direction === "SHORT" && stopOrder < entryOrder) {
      return "stopOrder cannnot be below the entryOrder";
    }

    return "";
  };
  return { validate_createTicket_step1ToStep2, validate_createTicket_step2ToStep3 };
};
