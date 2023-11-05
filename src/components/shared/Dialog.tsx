"use client";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CodeSection from "../codeSection/CodeSection";
import { cn } from "@/lib/utils";
import Login from "../authSection/Login";
import Saves from "../savesSection/Saves";
import useModal from "@/hooks/useModal";

type ModalType = "auth" | "save" | "code" | null;
// max-w-[460px]
function getModalComponent(modalType: ModalType) {
  switch (modalType) {
    case "auth":
      return <Login />;
    case "save":
      return <Saves />;
    case "code":
      return (
        <CodeSection
          className="mt-6"
          //highlighterCSS="max-w-[460px]"
        />
      );
    default:
      return null; // Return null or a default component if the type doesn't match any cases
  }
}

export function MainDialog() {
  const { modalState, modalType, handleModalStatusChange } = useModal();

  return (
    <Dialog onOpenChange={handleModalStatusChange} open={modalState}>
      <DialogContent
        className={cn(
          "bg-[#f9fafb] rounded-sm w-[96%] sm:w-full max-h-[90%] overflow-auto",
          modalType === "code" && "flex flex-col",
          modalType === "save" && "flex flex-col"
        )}
      >
        {getModalComponent(modalType)}
      </DialogContent>
    </Dialog>
  );
}

export default MainDialog;
