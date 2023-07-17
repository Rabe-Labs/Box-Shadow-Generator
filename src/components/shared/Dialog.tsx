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
import { Button } from "../ui/button";
import { ZoomIn } from "lucide-react";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Highlighter } from "../codeSection/Highlighter";
import CodeSection from "../codeSection/CodeSection";
import { DialogContext } from "@/context/DialogContext";
import { cn } from "@/lib/utils";
import Login from "../authSection/Login";
import Saves from "../savesSection/Saves";
import useModal from "@/hooks/useModal";

type ModalType = "auth" | "save" | "code" | null;

function getModalComponent(modalType: ModalType) {
  switch (modalType) {
    case "auth":
      return <Login />;
    case "save":
      return <Saves />;
    case "code":
      return <CodeSection />;
    default:
      return null; // Return null or a default component if the type doesn't match any cases
  }
}

export function MainDialog() {
  const {
    modalState: { isOpen, type },
    handleModalStatusChange,
  } = useModal();

  return (
    <Dialog onOpenChange={() => handleModalStatusChange("code")} open={isOpen}>
      <DialogContent className={cn("bg-[#f9fafb]")}>
        {getModalComponent(type)}
      </DialogContent>
    </Dialog>
  );
}

export default MainDialog;
