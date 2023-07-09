"use client";
import React from "react";

function ColorPicker() {
  const [colorValue, setColorValue] = React.useState("#000000");

  return (
    <div className="input-label">
      <label htmlFor="icon-color">Color</label>
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
              id="icon-color"
              name="icon-color"
              className="absolute h-[4em] w-[4em] top-[50%] left-[50%] 
                translate-x-[-50%] translate-y-[-50%] overflow-hidden border-none m-0 p-0"
            />
          </div>
          <input
            onChange={(e) => setColorValue(e.target.value)}
            value={colorValue}
            autoComplete="off"
            type="text"
            id="icon-color-input"
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
