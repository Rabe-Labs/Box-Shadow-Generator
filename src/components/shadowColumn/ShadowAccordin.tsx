import React, { useState, ChangeEvent } from "react";
import { IBoxShadowProps } from "./shadow.types";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import ColorPicker from "../shared/ColorPicker";
import ShadowSlider from "../shared/ItemSlider";
import { Checkbox } from "../ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import useShadowContainer from "@/hooks/useShadowContainer";
//import { camalize } from "@/lib/utils";

interface IAccordinItemProps {
  index: number;
  shadowProp: IBoxShadowProps;
}

const ShadowAccordin = () => {
  const { contextState } = useShadowContainer();
  console.log(contextState);
  return (
    <Accordion type="multiple" className="w-full">
      {contextState.boxShadows.length > 0 ? (
        contextState.boxShadows.map((newShadow, index) => (
          <AccordinItem
            index={index}
            key={newShadow.id}
            shadowProp={newShadow}
          />
        ))
      ) : (
        <div>
          <p className="text-sm text-center">Add a Shadow to get started</p>
        </div>
      )}
    </Accordion>
  );
};

const AccordinItem = ({ index, shadowProp }: IAccordinItemProps) => {
  const { removeShadow, setShadowProperty } = useShadowContainer();

  const handleSliderValueChange = (
    nameOfTheKey: keyof IBoxShadowProps,
    val: number
  ) => {
    setShadowProperty(shadowProp.id, nameOfTheKey, val);
  };

  const handleColorValueChange = (key: keyof IBoxShadowProps, clr: string) => {
    setShadowProperty(shadowProp.id, key, clr);
  };

  return (
    <AccordionItem value={`shadow-${index + 1}`}>
      <AccordionTrigger> Shadow {index + 1} </AccordionTrigger>
      <AccordionContent>
        <div className="pb-2 space-y-4">
          <div className="flex items-center">
            {/* CHECKBOXES */}
            <div className="flex gap-3">
              <label
                htmlFor={`inset-${index + 1}`}
                className="flex items-center gap-[0.3em] text-[0.95rem] pl-1"
              >
                <Checkbox
                  onCheckedChange={(checked) => {
                    setShadowProperty(shadowProp.id, "inset", checked);
                  }}
                  checked={shadowProp.inset}
                  id={`inset-${index + 1}`}
                  name={`inset-${index + 1}`}
                />
                <span> Inset </span>
              </label>

              <label
                htmlFor={`active-${index + 1}`}
                className="flex items-center gap-1 text-[0.95rem]"
              >
                <Checkbox
                  onCheckedChange={(checked) => {
                    setShadowProperty(shadowProp.id, "active", checked);
                  }}
                  checked={shadowProp.active}
                  id={`active-${index + 1}`}
                  name={`active-${index + 1}`}
                />

                <span> Active </span>
              </label>
            </div>
            {/* TRASH BUTTON */}
            <Button
              onClick={() => {
                console.log("delete click id", shadowProp.id);
                removeShadow(shadowProp.id);
              }}
              size={"icon"}
              title="remove shadow"
              type="button"
              className="ml-auto flex bg-red-500 text-white rounded-sm hover:bg-red-600"
            >
              <Trash size="1.2em" />
            </Button>
          </div>
          {/* COLOR PICKER */}
          <div className="mt-4">
            <ColorPicker
              itemKey="color"
              defaultColor={shadowProp.color}
              handleChange={handleColorValueChange}
            />
          </div>
          {/* SLIDER */}
          <div className="space-y-8">
            <ShadowSlider
              handleChange={handleSliderValueChange}
              name={"horizontalOffset"}
              label={"Horizontal offset"}
              defaultVal={[shadowProp.horizontalOffset]}
              max={200}
              min={-200}
            />
            <ShadowSlider
              handleChange={handleSliderValueChange}
              name={"verticalOffset"}
              label={"Vertical offset"}
              defaultVal={[shadowProp.verticalOffset]}
              max={200}
              min={-200}
            />
            <ShadowSlider
              handleChange={handleSliderValueChange}
              label={"Blur radius"}
              name={"blurRadius"}
              defaultVal={[shadowProp.blurRadius]}
              max={200}
              min={0}
            />
            <ShadowSlider
              handleChange={handleSliderValueChange}
              name={"spreadRadius"}
              label={"Spread radius"}
              defaultVal={[shadowProp.spreadRadius]}
              max={200}
              min={-99}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ShadowAccordin;
