"use client";
import { createContext, useState } from "react";

interface initialStateType {
  isOpen: boolean;
  type: "auth" | "save" | "code" | null;
}

const initialState: initialStateType = {
  isOpen: false,
  type: null,
};

interface IDialogContext {
  modalState: initialStateType;
  handleModalStatusChange: (type: "auth" | "save" | "code" | null) => void;
}

const DialogContext = createContext<IDialogContext>({} as IDialogContext);

const DialogContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<initialStateType>(initialState);

  const handleModalStatusChange = (type: "auth" | "save" | "code" | null) => {
    if (!type) {
      setModalState((prev) => {
        return { ...prev, isOpen: !prev.isOpen };
      });
    } else {
      setModalState(({ isOpen, type }) => ({ isOpen: !isOpen, type }));
    }
  };

  return (
    <DialogContext.Provider value={{ modalState, handleModalStatusChange }}>
      {children}
    </DialogContext.Provider>
  );
};

export { DialogContextProvider, DialogContext };
