"use client";
import { HTMLAttributes, useEffect, useState, useContext } from "react";
import { Highlighter } from "./Highlighter";
import useShadowContainer from "@/hooks/useShadowContainer";
import useCopy from "use-copy";
import { cn, getAllBoxShadows, getAllTailwindBoxShadows } from "@/lib/utils";
import ColumnTitle from "../shared/ColumnTitle";
import { Minus, Save, Trash, ZoomIn, ZoomOut } from "lucide-react";
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
  AllboxShadow?: any;
  boxId: string;
  setSavedData: any;
}
const SaveCodeSection = ({
  className,
  highlighterCSS,
  AllboxShadow,
  boxId,
  setSavedData,
}: ICodeColumnProps) => {
  type CSSType = "vanillaCSS" | "tailwind";

  const [cssSnippet, setCssSnippet] = useState<string>("");
  const [cssMode, setCssMode] = useState<CSSType>("vanillaCSS");
  const [isIconHovered, setIconHovered] = useState(false);
  const [value, copy] = useCopyToClipboard();

  const { status, data: session } = useSession();
  const userEmail = session?.user?.email || "";

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

  const copyToClipBoard = () => {
    let stringifiedValue = ``;
    if (cssMode === "vanillaCSS") {
      stringifiedValue = `.box {
        box-shadow: ${getAllBoxShadows(AllboxShadow)};
     }`;
    } else {
      stringifiedValue = `.box {
        @apply shadow-[${getAllTailwindBoxShadows(AllboxShadow)}] 
      }`;
    }

    toast.success("Copied to clipboard!");

    return stringifiedValue;
  };

  function handleSaveDelete(boxId: string) {
    async function getData() {
      const response = await fetch(
        `http://localhost:3000/api/save/${userEmail}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            boxId,
          }),
        }
      );
      const jsonResponse = await response.json();
      setSavedData((prev: any) =>
        prev.filter((item: any) => item._id !== boxId)
      );
    }
    getData();
  }

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
          {/* highlighter banner */}
          <div
            className={cn(
              "w-full h-9 flex items-center justify-between px-2 rounded-t-md",
              "bg-[rgb(52,53,65)]"
            )}
          >
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-2">
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

          {/* highlighter content */}
          <Highlighter
            language={cssMode === "vanillaCSS" ? "css" : "postCSS"}
            theme={atomOneDark}
            className={cn(
              "scrollbar-thin	scrollbar-thumb-[#5b5c5e] scrollbar-rounded-[10px] max-h-[400px]",
              highlighterCSS
            )}
          >
            {cssSnippet}
          </Highlighter>
        </TabsContent>{" "}
        <div className="flex justify-between items-center">
          {/* trash btn */}
          <button
            onClick={() => handleSaveDelete(boxId)}
            onMouseEnter={() => setIconHovered(true)}
            onMouseLeave={() => setIconHovered(false)}
          >
            <Trash
              fill={isIconHovered ? "red" : "none"}
              size="1.2em"
              className="hover:text-red-600 transition-all"
            />
          </button>
          {/*  */}
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
        </div>
      </Tabs>
    </>
  );
};

export default SaveCodeSection;
