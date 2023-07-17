"use client";
import { DialogContext } from "@/context/DialogContext";
import { useContext } from "react";

const useModal = () => {
  return useContext(DialogContext);
};

export default useModal;
