import React from "react";
import { Slider } from "../ui/slider";

interface IShadowSliderProps {
  defaultVal: number[];
  min: number;
  max: number;
  label: string;
  value?: number;
}

const ShadowSlider = ({ label, min, max, defaultVal }: IShadowSliderProps) => {
  const [sliderValue, setSliderValue] = React.useState<number[]>(defaultVal);
  console.log("sliderValue", sliderValue);
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center">
          <label htmlFor="slider" className="text-[15px]">
            {label}
          </label>
          <div className="flex gap-1 items-center">
            <input
              value={String(sliderValue[0])}
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
        //defaultValue={defaultVal}
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
