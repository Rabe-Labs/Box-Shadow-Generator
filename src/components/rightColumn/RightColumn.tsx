"use client";
import { useState, useEffect } from "react";
import useShadowContainer from "@/hooks/useShadowContainer";
import ColorPicker from "../shared/ColorPicker";
import { IContainerProps } from "@/context/shadowContainerContext.types";
import ShadowSlider from "../shared/ItemSlider";
import "highlight.js/styles/github.css";
import useCopy from "use-copy";

import { Highlighter } from "../codeSection/Highlighter";
import CodeSection from "../codeSection/CodeSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface IBoxShadowProps {
  name: keyof IBoxShadowProps;
  handleChange: (key: keyof IBoxShadowProps, val: string) => void;
}

interface IBoxPropsColumnProps {}

const RightColumn = (props: IBoxPropsColumnProps) => {
  const {
    contextState: { containerProps },
    setContainerProperty,
  } = useShadowContainer();

  const handleValueChange = (key: keyof IContainerProps, val: number) => {
    setContainerProperty(key, val);
  };

  const [cssSnippet, setCssSnippet] = useState<string>("");
  const [copied, copy, setCopied] = useCopy(cssSnippet);
  const { contextState } = useShadowContainer();
  const copyText = () => {
    copy();

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <section className="flex flex-col gap-6">
      <Tabs defaultValue="code">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="boxProperties">Box Properties </TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="boxProperties" className="space-y-5 py-4">
          <ColorPicker
            name={"Background Color"}
            itemKey={"backgroundColor"}
            defaultColor={containerProps.backgroundColor}
            handleChange={handleValueChange}
          />
          <ColorPicker
            name={"Canvas Color"}
            itemKey={"canvasColor"}
            defaultColor={containerProps.canvasColor}
            handleChange={handleValueChange}
          />
          <ShadowSlider
            handleChange={handleValueChange}
            name={"width"}
            label={"Width"}
            defaultVal={[containerProps.width]}
            max={300}
            min={0}
          />
          <ShadowSlider
            handleChange={handleValueChange}
            name={"height"}
            label={"Height"}
            defaultVal={[containerProps.height]}
            max={300}
            min={0}
          />
          <ShadowSlider
            handleChange={handleValueChange}
            name={"borderRadius"}
            label={"Border radius"}
            defaultVal={[containerProps.borderRadius]}
            max={200}
            min={0}
          />
        </TabsContent>
        <TabsContent value="code">
          <CodeSection />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default RightColumn;
