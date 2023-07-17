"use client";
import { createContext, useState } from "react";

type TModalType = "auth" | "save" | "code";
interface IDialogContext {
  modalState: boolean;
  modalType: TModalType;
  handleModalStatusChange: () => void;
  handleModalTypeChange: (type: "auth" | "save" | "code") => void;
}

const DialogContext = createContext<IDialogContext>({} as IDialogContext);

const DialogContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState<TModalType>("auth");

  const handleModalStatusChange = () => setModalState((prev) => !prev);
  const handleModalTypeChange = (type: "auth" | "save" | "code") =>
    setModalType(type);

  return (
    <DialogContext.Provider
      value={{
        modalState,
        modalType,
        handleModalStatusChange,
        handleModalTypeChange,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export { DialogContextProvider, DialogContext };
