import React from "react";
import { IBoxShadowProperties } from "./shadow.types";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import ColorPicker from "./ColorPicker";
import ShadowSlider from "./ShadowSlider";
import { Checkbox } from "../ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface IShadowLayerProps {
  index: number;
  layer: IBoxShadowProperties;
}

const ShadowAccordin = ({ layer, index }: IShadowLayerProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={`shadow-${index}`}>
        <AccordionTrigger> Shadow {index} </AccordionTrigger>
        <AccordionContent>
          <div className="pb-2 space-y-4">
            <div className="flex items-center">
              {/* CHECKBOXES */}
              <div className="flex gap-3">
                <label
                  htmlFor="inset"
                  className="flex items-center gap-[0.3em] text-[0.95rem] pl-1"
                >
                  <Checkbox />
                  <span> Inset </span>
                </label>

                <label
                  htmlFor="inset"
                  className="flex items-center gap-1 text-[0.95rem]"
                >
                  <Checkbox />
                  <span> Active </span>
                </label>
              </div>
              {/* TRASH BUTTON */}
              <Button
                size={"icon"}
                title="remove"
                type="button"
                className="ml-auto flex bg-red-500 text-white rounded-sm hover:bg-red-600"
              >
                <Trash size="1.2em" />
              </Button>
            </div>
            {/* COLOR PICKER */}
            <div className="mt-4">
              <ColorPicker />
            </div>
            {/* SLIDER */}
            <div className="space-y-8">
              <ShadowSlider
                label={"Horizontal offset"}
                defaultVal={[9]}
                max={200}
                min={-200}
              />
              <ShadowSlider
                label={"Vertical offset"}
                defaultVal={[5]}
                max={200}
                min={-200}
              />
              <ShadowSlider
                label={"Blur radius"}
                defaultVal={[20]}
                max={200}
                min={-200}
              />
              <ShadowSlider
                label={"Spread radius"}
                defaultVal={[100]}
                max={200}
                min={-200}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ShadowAccordin;
