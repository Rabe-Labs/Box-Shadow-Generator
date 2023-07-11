import { IBoxShadowProps } from "@/components/shadowColumn/shadow.types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function camalize(str: string): string | keyof IBoxShadowProps {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

// !https://stackoverflow.com/questions/57894668/how-to-define-return-type-using-keyof-accessor-with-typescript

const getBoxShadow = (boxShadowProps: IBoxShadowProps): string =>
  `${boxShadowProps.inset ? "inset" : ""} ${
    boxShadowProps.horizontalOffset
  }px ${boxShadowProps.verticalOffset}px ${boxShadowProps.blurRadius}px ${
    boxShadowProps.spreadRadius
  }px ${boxShadowProps.color}`;

export const getAllBoxShadows = (boxShadowProps: IBoxShadowProps[]) =>
  boxShadowProps
    .map((currentShadow) => {
      console.log("getBoxShadow", getBoxShadow(currentShadow).trim());
      return getBoxShadow(currentShadow).trim();
    })
    .join(", ");
