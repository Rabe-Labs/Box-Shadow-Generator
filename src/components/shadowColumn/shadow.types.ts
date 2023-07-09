import { HTMLAttributes } from "react";

export interface IBoxShadowProperties extends HTMLAttributes<HTMLDivElement> {
  id: string;
  horizontalOffset: number;
  verticalOffset: number;
  blurRadius: number;
  spreadRadius: number;
  color: string;
  activeInset?: "" | "inset";
}
