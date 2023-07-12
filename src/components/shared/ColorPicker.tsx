"use client";
import { IContainerProps } from "@/context/shadowContainerContext.types";
import { HTMLAttributes, useEffect, useState } from "react";
import { IBoxShadowProps } from "../shadowColumn/shadow.types";

interface IColorPickerProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  itemKey: keyof IContainerProps | keyof IBoxShadowProps;
  defaultColor?: string;
  handleChange: (
    key: keyof IContainerProps | keyof IBoxShadowProps,
    val: string
  ) => void;
}

function ColorPicker({
  itemKey,
  name = "color",
  defaultColor = "#000000",
  handleChange,
}: IColorPickerProps) {
  const [colorValue, setColorValue] = useState(defaultColor);

  useEffect(() => {
    handleChange(itemKey, colorValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorValue]);

  return (
    <div className="">
      <label htmlFor={itemKey} className="text-sm mt-2">
        {name}
      </label>
      <div className="w-full border-2 bg-[#f6f6f7] p-1 rounded-md">
        <div className="grid grid-cols-[30px,auto]">
          {/* color-input-wrapper */}
          <div
            className="h-[1.5em] w-[1.5em] overflow-hidden rounded-full
             inline-flex items-center relative"
          >
            <input
              value={colorValue}
              onChange={(e) => setColorValue(e.target.value)}
              type="color"
              id={itemKey}
              className="absolute h-[4em] w-[4em] top-[50%] left-[50%] 
                translate-x-[-50%] translate-y-[-50%] overflow-hidden border-none m-0 p-0"
            />
          </div>
          <input
            onChange={(e) => setColorValue(e.target.value)}
            value={colorValue}
            autoComplete="off"
            type="text"
            name="icon-color-input"
            className="w-full h-full bg-transparent text-md 
              text-left transition-colors cursor-text 
              flex items-center justify-center focus:outline-none"
            aria-label="Color picker input"
          />
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
