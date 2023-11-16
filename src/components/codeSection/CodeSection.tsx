"use client";
import { HTMLAttributes, useEffect, useState, useContext } from "react";
import { Highlighter } from "./Highlighter";
import useShadowContainer from "@/hooks/useShadowContainer";
import useCopy from "use-copy";
import { cn, getAllBoxShadows, getAllTailwindBoxShadows } from "@/lib/utils";
import ColumnTitle from "../shared/ColumnTitle";
import { Minus, Save, ZoomIn, ZoomOut } from "lucide-react";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Clipboard } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Dialog } from "../ui/dialog";
import MainDialog from "../shared/Dialog";
import { DialogContext } from "@/context/DialogContext";
import useModal from "@/hooks/useModal";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

import toast from "react-hot-toast";

interface ICodeColumnProps extends HTMLAttributes<HTMLDivElement> {
  highlighterCSS?: string;
}
const CodeColumn = ({ className, highlighterCSS }: ICodeColumnProps) => {
  type CSSType = "vanillaCSS" | "tailwind";
  const [cssSnippet, setCssSnippet] = useState<string>("");
  const [cssMode, setCssMode] = useState<CSSType>("vanillaCSS");
  const [value, copy] = useCopyToClipboard();

  const { contextState } = useShadowContainer();
  const { status, data: session } = useSession();

  const userEmail = session?.user?.email || "";

  const { modalState, handleModalStatusChange, handleModalTypeChange } =
    useModal();

  useEffect(() => {
    const allVanilleCSSBoxShadows = getAllBoxShadows(contextState.boxShadows);
    const allTwCSSSBoxShadows = getAllTailwindBoxShadows(
      contextState.boxShadows
    );

    const stringifiedVanilliaCssStyles = `.box {
    box-shadow: ${allVanilleCSSBoxShadows};
     
    /* box properties */
    width: ${contextState.containerProps.width}px;
    height: ${contextState.containerProps.height}px; 
    border-radius: ${contextState.containerProps.borderRadius}px;
    background-color: ${contextState.containerProps.backgroundColor};
 }`;

    const stringifiedTailwindStyles = `.box {
    @apply shadow-[${allTwCSSSBoxShadows}] 
      w-[${contextState.containerProps.width}px] h-[${
      contextState.containerProps.height
    }px] rounded-[${
      contextState.containerProps.borderRadius
    }px] bg-[${contextState.containerProps.backgroundColor.replace(/ /g, "")}]
  }`;

    setCssSnippet(
      cssMode === "vanillaCSS"
        ? stringifiedVanilliaCssStyles
        : stringifiedTailwindStyles
    );
  }, [contextState, cssMode]);

  const copyToClipBoard = () => {
    const AllBoxShadows = getAllBoxShadows(contextState.boxShadows);
    let stringifiedValue = ``;
    if (cssMode === "vanillaCSS") {
      stringifiedValue = `.box {
        box-shadow: ${AllBoxShadows};
     }`;
    } else {
      stringifiedValue = `.box {
        @apply shadow-[${getAllTailwindBoxShadows(contextState.boxShadows)}] 
      }`;
    }
    toast.success("Copied to clipboard!");

    return stringifiedValue;
  };

  const handleSave = async () => {
    const boxShadows = contextState.boxShadows;

    if (boxShadows.length === 0) {
      toast.error("Add at least one layer before saving.", {
        style: {
          fontSize: "clamp(0.83rem, 0.7rem + 0.5vw, 1rem)",
          padding: "0.6rem",
        },
      });

      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/save/${userEmail}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boxShadows,
        }),
      }
    );

    if (response.status === 200) {
      toast.success("Saved", {
        style: {
          fontSize: "clamp(0.83rem, 0.7rem + 0.5vw, 1rem)",
          padding: "0.6rem",
        },
      });
    } else {
      toast.error("Something went wrong", {
        style: {
          fontSize: "clamp(0.83rem, 0.7rem + 0.5vw, 1rem)",
          padding: "0.6rem",
        },
      });
    }
  };

  return (
    <>
      <Tabs
        onValueChange={(val) => {
          if (val === "vanillaCSS" || val === "tailwind") setCssMode(val);
        }}
        defaultValue={cssMode}
        className="w-full mb-3 flex flex-col gap-2"
      >
        <TabsContent value={cssMode} className={className}>
          <div
            className={cn(
              "w-full h-9 flex items-center justify-between px-2 rounded-t-md",
              "bg-[rgb(52,53,65)]"
            )}
          >
            <div className="flex justify-between w-full">
              <span
                onClick={() => {
                  handleModalStatusChange();
                  handleModalTypeChange("code");
                }}
                className="text-slate-500 flex items-center 
            justify-center cursor-pointer transition-colors
             hover:bg-slate-500/20 rounded-full p-1"
              >
                {!modalState ? (
                  <ZoomIn className="h-4 w-4" />
                ) : (
                  <ZoomOut className="h-4 w-4" />
                )}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  className="text-slate-500 flex items-center p-2 h-6 gap-1 hover:text-slate-500/70"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4" />
                  <span className="text-xs sm:text-sm"> Save</span>
                </Button>
                <span
                  onClick={() => copy(copyToClipBoard())}
                  className="text-slate-500 flex items-center 
            justify-center cursor-pointer transition-colors
             hover:bg-slate-500/20 rounded-full p-1"
                >
                  <Clipboard className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>

          <Highlighter
            language={cssMode === "vanillaCSS" ? "css" : "postCSS"}
            theme={atomOneDark}
            className={cn(
              "scrollbar-thin	scrollbar-thumb-[#5b5c5e] scrollbar-rounded-[10px]",
              highlighterCSS
            )}
          >
            {cssSnippet}
          </Highlighter>
        </TabsContent>{" "}
        <TabsList className="h-11 w-fit ml-auto p-0 py-0 bg-transparent rounded-none">
          <TabsTrigger
            title="View vanilla css code"
            value="vanillaCSS"
            className={cn(
              "py-1 text-[0.8rem] rounded-sm",
              cssMode !== "vanillaCSS" && "text-[#e4be28]"
            )}
          >
            Vanilla CSS
          </TabsTrigger>
          <TabsTrigger
            title="View tailwind css code"
            value="tailwind"
            className={cn(
              "py-1 text-[0.8rem] rounded-sm focus-visible:text-[#38bdf8]",
              cssMode !== "tailwind" && "text-[#38bdf8]"
            )}
          >
            Tailwind{" "}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default CodeColumn;
