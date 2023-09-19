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

interface ICodeColumnProps extends HTMLAttributes<HTMLDivElement> {
  highlighterCSS?: string;
  AllboxShadow?: any;
}
const SaveCodeSection = ({
  className,
  highlighterCSS,
  AllboxShadow,
}: ICodeColumnProps) => {
  type CSSType = "vanillaCSS" | "tailwind";

  const [cssSnippet, setCssSnippet] = useState<string>("");
  const [cssMode, setCssMode] = useState<CSSType>("vanillaCSS");

  const [value, copy] = useCopyToClipboard();

  const { modalState, handleModalStatusChange, handleModalTypeChange } =
    useModal();

  useEffect(() => {
    const allVanilleCSSBoxShadows = getAllBoxShadows(AllboxShadow);
    const allTwCSSSBoxShadows = getAllTailwindBoxShadows(AllboxShadow);

    const stringifiedVanilliaCssStyles = `.box {
    box-shadow: ${allVanilleCSSBoxShadows};
  }`;

    const stringifiedTailwindStyles = `.box {
    @apply shadow-[${allTwCSSSBoxShadows}] 
  }`;

    setCssSnippet(
      cssMode === "vanillaCSS"
        ? stringifiedVanilliaCssStyles
        : stringifiedTailwindStyles
    );
  }, [cssMode]);

  // const copyToClipBoard = () => {
  //   const AllBoxShadows = getAllBoxShadows(contextState.boxShadows);
  //   let stringifiedValue = ``;
  //   if (cssMode === "vanillaCSS") {
  //     stringifiedValue = `.box {
  //       box-shadow: ${AllBoxShadows};
  //    }`;
  //   } else {
  //     stringifiedValue = `.box {
  //       @apply shadow-[${getAllTailwindBoxShadows(contextState.boxShadows)}]
  //     }`;
  //   }

  //   return stringifiedValue;
  // };

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
              <div className="flex items-center gap-2">
                <span
                  //onClick={() => copy(copyToClipBoard())}
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

export default SaveCodeSection;
