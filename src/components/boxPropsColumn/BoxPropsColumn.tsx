"use client";
import React from "react";
import ColumnTitle from "../shared/ColumnTitle";
import useShadowContainer from "@/hooks/useShadowContainer";
import ColorPicker from "../shared/ColorPicker";
import { IContainerProps } from "@/context/shadowContainerContext.types";
import ShadowSlider from "../shared/ItemSlider";

interface IBoxShadowProps {
  name: keyof IBoxShadowProps;
  handleChange: (key: keyof IBoxShadowProps, val: string) => void;
}

interface IBoxPropsColumnProps {}

const BoxPropsColumn = (props: IBoxPropsColumnProps) => {
  const {
    contextState: { containerProps },
    setContainerProperty,
  } = useShadowContainer();

  const handleValueChange = (key: keyof IContainerProps, val: number) => {
    setContainerProperty(key, val);
  };

  return (
    <section className="flex flex-col gap-6">
      <ColumnTitle name="Box Properties" />
      <div className="mt-2">
        <ColorPicker
          name={"Background Color"}
          itemKey={"backgroundColor"}
          defaultColor={containerProps.backgroundColor}
          handleChange={handleValueChange}
        />
      </div>
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
    </section>
  );
};

export default BoxPropsColumn;
