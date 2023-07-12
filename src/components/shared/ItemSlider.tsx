import { ChangeEvent, useState, useEffect } from "react";
import { Slider } from "../ui/slider";
import { IBoxShadowProps } from "../shadowColumn/shadow.types";
import {
  IContainerProps,
  ShadowKey,
} from "@/context/shadowContainerContext.types";

interface IShadowSliderProps<T> {
  defaultVal: number[];
  min: number;
  max: number;
  label: string;
  value: number;
  name: keyof T;
  handleChange: (key: keyof T, val: number) => void;
}

const ShadowSlider = <T extends object>({
  handleChange,
  name,
  label,
  min,
  max,
  defaultVal,
}: IShadowSliderProps<IContainerProps | IBoxShadowProps>) => {
  const [sliderValue, setSliderValue] = useState<number[]>(defaultVal);

  useEffect(() => {
    handleChange(name, sliderValue[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue, setSliderValue]);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center">
          <label htmlFor="slider" className="text-[15px]">
            {label}
          </label>
          <div className="flex gap-1 items-center">
            <input
              value={sliderValue[0]}
              onChange={(e) => {
                if (name === "blurRadius" && Number(e.target.value) < 0) {
                  setSliderValue([0]);
                  return;
                } else if (
                  name === "spreadRadius" &&
                  Number(e.target.value) < -99
                ) {
                  setSliderValue([-99]);
                  return;
                }
                setSliderValue([Number(e.target.value)]);
              }}
              min={min}
              max={max}
              name={name}
              type="number"
              className="w-12 border border-gray-300 appearance-none bg-white shadow-sm px-2 py-1 text-sm rounded-sm
              focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <span className="text-sm">px</span>
          </div>
        </div>
      </div>
      <Slider
        name={name}
        max={max}
        min={min}
        step={1}
        value={sliderValue}
        onValueChange={(val: number[]) => setSliderValue(val)}
      />
    </div>
  );
};

export default ShadowSlider;
