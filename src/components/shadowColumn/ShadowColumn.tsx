"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import ShadowAccordin from "./ShadowAccordin";
import { IBoxShadowProps } from "./shadow.types";
import { Plus } from "lucide-react";
import useShadowContainer from "@/hooks/useShadowContainer";

const ShadowSection = () => {
  const { addNewShadow } = useShadowContainer();

  return (
    <section className="flex flex-col gap-4">
      <h1 className="lg:text-center">
        <span className="text-md drop-shadow font-medium">
          Customize Shadow
        </span>
      </h1>
      <div className="flex items-center">
        {/* <button className=""></button> */}
        <Button className="flex items-center gap-2" onClick={addNewShadow}>
          <Plus size="1.3em" /> Add a Shadow{" "}
        </Button>
      </div>
      <div>
        <ShadowAccordin />
      </div>
    </section>
  );
};

export default ShadowSection;
