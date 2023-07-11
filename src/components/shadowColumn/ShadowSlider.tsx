import { ChangeEvent, useState, useEffect } from "react";
import { Slider } from "../ui/slider";
import { IBoxShadowProps } from "./shadow.types";
import { ShadowKey } from "@/context/shadowContainerContext.types";

interface IShadowSliderProps {
  defaultVal: number[];
  min: number;
  max: number;
  label: string;
  name: keyof IBoxShadowProps;
  value?: number;
  handleChange: (key: keyof IBoxShadowProps, val: number) => void;
}

const ShadowSlider = ({
  handleChange,
  name,
  label,
  min,
  max,
  defaultVal,
}: IShadowSliderProps) => {
  const [sliderValue, setSliderValue] = useState<number[]>(defaultVal);

  useEffect(() => {
    handleChange(name, sliderValue[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue]);

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
              onChange={(e) => setSliderValue([Number(e.target.value)])}
              name="sliderValue"
              min="10"
              max="100"
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
