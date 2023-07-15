import { HTMLAttributes, useEffect, useState } from "react";
import { Highlighter } from "./Highlighter";
import useShadowContainer from "@/hooks/useShadowContainer";
import useCopy from "use-copy";
import { cn, getAllBoxShadows, getAllTailwindBoxShadows } from "@/lib/utils";
import ColumnTitle from "../shared/ColumnTitle";
import { Minus } from "lucide-react";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const CodeColumn = () => {
  type CSSType = "vanillaCSS" | "tailwind";
  const [cssSnippet, setCssSnippet] = useState<string>("");
  const [copied, copy, setCopied] = useCopy(cssSnippet);
  const [cssMode, setCssMode] = useState<CSSType>("vanillaCSS");

  const { contextState } = useShadowContainer();
  const copyText = () => {
    copy();

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  useEffect(() => {
    const AllBoxShadows = getAllBoxShadows(contextState.boxShadows);

    const stringifiedVanilliaCssStyles = `.box {
    box-shadow: ${AllBoxShadows};
     
    /* box properties */
    width: ${contextState.containerProps.width}px;
    height: ${contextState.containerProps.height}px; 
    border-radius: ${contextState.containerProps.borderRadius}px;
    background-color: ${contextState.containerProps.backgroundColor};
 }`;

    const stringifiedTailwindStyles = `.box{
    @apply shadow-[${getAllTailwindBoxShadows(contextState.boxShadows)}] 
      w-[${contextState.containerProps.width}px] h-[${
      contextState.containerProps.height
    }px] rounded-[${contextState.containerProps.borderRadius}] bg-[${
      contextState.containerProps.backgroundColor
    }]
  }`;

    setCssSnippet(
      cssMode === "vanillaCSS"
        ? stringifiedVanilliaCssStyles
        : stringifiedTailwindStyles
    );
  }, [contextState, cssMode]);

  return (
    <section className="">
      {/* CODE BLOCK */}
      <ColumnTitle name="Code" className="mb-3" />

      <Tabs
        onValueChange={(val) => {
          if (val === "vanillaCSS" || val === "tailwind") setCssMode(val);
        }}
        defaultValue={cssMode}
        className="w-full mb-3 flex flex-col"
      >
        <TabsList className="h-11 w-fit mx-auto px-2">
          <TabsTrigger value="vanillaCSS">Vanilla CSS</TabsTrigger>
          <TabsTrigger value="tailwind">Tailwind </TabsTrigger>
        </TabsList>
        <TabsContent value={cssMode}>
          <div
            className={cn(
              "w-full h-9 flex items-center justify-between px-2 rounded-t-md",
              "bg-[rgb(52,53,65)]"
            )}
          >
            <div className="flex">
              <div className="h-4 w-4 rounded-[50%] m-1 bg-[rgb(255,189,45)] flex items-center justify-center cursor-pointer">
                <Minus
                  size="0.8em"
                  className="opacity-0 text-[#985712] hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>

          <Highlighter
            language="css"
            theme={atomOneDark}
            className="w-full scrollbar-thin	scrollbar-thumb-[#5b5c5e] scrollbar-rounded-[10px]"
          >
            {cssSnippet}
          </Highlighter>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default CodeColumn;
