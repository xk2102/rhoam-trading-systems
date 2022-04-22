import React, { useState, createContext, useEffect } from "react";
import { ticket } from "../modules/types";

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
  const [tickets, setTickets] = useState<ticket[] | []>([]);
  useEffect(() => console.log(tickets), [tickets]);

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
