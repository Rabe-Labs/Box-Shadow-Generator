import { HTMLAttributes } from "react";

export interface IBoxShadowProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  horizontalOffset: number;
  verticalOffset: number;
  blurRadius: number;
  spreadRadius: number;
  color: string;
  inset?: boolean;
  active?: boolean;
}
