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
    .filter((currentShadow) => currentShadow.active)
    .map((currentShadow) => {
      console.log("getBoxShadow", getBoxShadow(currentShadow).trim());
      return getBoxShadow(currentShadow).trim();
    })
    .join(",\n\t  ");

const convertObjectToStringifiedTwCode = (boxShadowProps: IBoxShadowProps) => {
  const inset = boxShadowProps.inset ? "inset " : "";
  const tailwindCode = `${inset}${boxShadowProps.horizontalOffset}px ${
    boxShadowProps.verticalOffset
  }px ${boxShadowProps.blurRadius}px ${
    boxShadowProps.spreadRadius
  }px ${boxShadowProps.color.replace(/ /g, "")}`;
  return tailwindCode.replace(/ /g, "_");
};

export const getAllTailwindBoxShadows = (boxShadowProps: IBoxShadowProps[]) => {
  return boxShadowProps
    .filter((currentShadow) => currentShadow.active)
    .map((currentShadow) => {
      return convertObjectToStringifiedTwCode(currentShadow).trim();
    })
    .join(",");
};
