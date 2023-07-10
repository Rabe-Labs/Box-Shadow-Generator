"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import ShadowAccordin from "./ShadowAccordin";
import { IBoxShadowProperties } from "./shadow.types";
import { Plus } from "lucide-react";

const ShadowSection = () => {
  const [state, setState] = useState<IBoxShadowProperties[]>([{}, {}]);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="lg:text-center">
        <span className="text-md drop-shadow font-medium">
          Customize Shadow
        </span>
      </h1>
      <div className="flex items-center">
        {/* <button className=""></button> */}
        <Button className="flex items-center gap-2">
          <Plus size="1.3em" /> Add a Shadow{" "}
        </Button>
      </div>
      <div>
        {state.map((shadowLayer, index) => (
          <ShadowAccordin
            key={shadowLayer.id}
            index={index}
            layer={shadowLayer}
          />
        ))}
      </div>
    </section>
  );
};

export default ShadowSection;
