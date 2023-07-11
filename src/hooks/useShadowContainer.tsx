"use client";
import { ShadowContainerContext } from "@/context/shadowContainerContext";
import { useContext } from "react";

const useShadowContainer = () => {
  return useContext(ShadowContainerContext);
};

export default useShadowContainer;
