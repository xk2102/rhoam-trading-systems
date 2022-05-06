import React, { useState, createContext, useEffect } from "react";
import { ticket, trade } from "../modules/types";

const mockData = [
  {
    commission: -11,
    contracts: 11,
    date: "2022-04-01",
    direction: "LONG",
    entryOrder: 1.4036,
    entryOrderStopOrderDifference: 0.00261,
    id: "4da1c025e33",
    lotSize: 25000,
    profitTargetOrder: 1.4092,
    profitToLossRatio: 2,
    quantity: 275000,
    rate: 0.648995,
    riskPerTrade: 0.005,
    stopOrder: 1.40099,
    symbol: "EURAUD",
    tradingEquity: 100000,
    units: 295181,
  },
  {
    commission: -11,
    contracts: 11,
    date: "2022-04-01",
    direction: "LONG",
    entryOrder: 1.4036,
    entryOrderStopOrderDifference: 0.00261,
    id: "4da1c025e34",
    lotSize: 25000,
    profitTargetOrder: 1.4092,
    profitToLossRatio: 2,
    quantity: 275000,
    rate: 0.648995,
    riskPerTrade: 0.005,
    stopOrder: 1.40099,
    symbol: "EURAUD",
    tradingEquity: 100000,
    units: 295181,
  },
];

type GlobalContextProviderProps = {
  children: React.ReactNode;
};
type GlobalContextType = {
  showBoxC: boolean;
  setShowBoxC: React.Dispatch<React.SetStateAction<boolean>>;
  createATicketStep: number;
  setCreateATicketStep: React.Dispatch<React.SetStateAction<number>>;
  pushToActionLog: (action: string) => void;
  tickets: [] | ticket[];
  setTickets: React.Dispatch<React.SetStateAction<ticket[] | []>>;
  selectedTicket: ticket | null;
  setSelectedTicket: React.Dispatch<React.SetStateAction<ticket | null>>;
  trades: [] | trade[];
  setTrades: React.Dispatch<React.SetStateAction<[] | trade[]>>;
  selectedTrade: trade | null;
  setSelectedTrade: React.Dispatch<React.SetStateAction<trade | null>>;
  deleteTicketById: (ticketId: string) => void;
  // MODAL
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalContent: any;
  setModalContent: React.Dispatch<React.SetStateAction<any>>;
  modalType: string | null;
  setModalType: React.Dispatch<React.SetStateAction<string | null>>;
  resetModal: () => void;
  activateModal: (_modalType: string | null, _modalContent: any) => void;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  // ---------------------------------------------
  // --STATE--------------------------------------
  // ---------------------------------------------
  const [showBoxC, setShowBoxC] = useState<boolean>(false);
  const [createATicketStep, setCreateATicketStep] = useState<number>(1);
  const [actionLog, setActionLog] = useState<string[]>(["initiated program"]);
  const pushToActionLog = (action: string): void => {
    setActionLog((prevActionLog) => [...prevActionLog, action]);
  };
  const [tickets, setTickets] = useState<ticket[] | []>(mockData);
  const [selectedTicket, setSelectedTicket] = useState<ticket | null>(null);
  const [trades, setTrades] = useState<trade[] | []>([]);
  const [selectedTrade, setSelectedTrade] = useState<trade | null>(null);

  function deleteTicketById(ticketId: string): void {
    let _tickets = tickets;
    _tickets = _tickets.filter((obj) => obj.id !== ticketId);
    setTickets(_tickets);
  }
  // ------------------------------------------------------
  // --MODAL-----------------------------------------------
  // ------------------------------------------------------
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<any>(null);
  const [modalType, setModalType] = useState<string | null>(null);

  function resetModal() {
    setModalIsOpen(false);
    setModalContent(null);
    setModalType(null);
  }
  function activateModal(_modalType: string | null, _modalContent: any) {
    setModalIsOpen(true);
    setModalType(_modalType);
    setModalContent(_modalContent);
  }

  return (
    <GlobalContext.Provider
      value={{
        showBoxC,
        setShowBoxC,
        createATicketStep,
        setCreateATicketStep,
        pushToActionLog,
        tickets,
        setTickets,
        selectedTicket,
        setSelectedTicket,
        trades,
        setTrades,
        selectedTrade,
        setSelectedTrade,
        deleteTicketById,
        // MODAL
        modalIsOpen,
        setModalIsOpen,
        modalContent,
        setModalContent,
        modalType,
        setModalType,
        resetModal,
        activateModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
