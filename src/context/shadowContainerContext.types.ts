import { IBoxShadowProps } from "@/components/shadowColumn/shadow.types";

export type ShadowKey =
  | "horizontalOffset"
  | "verticalOffset"
  | "blurRadius"
  | "spreadRadius"
  | "color"
  | "active"
  | "inset";

export type ContainerKey =
  | "width"
  | "height"
  | "borderRadius"
  | "backgroundColor";

export enum ContainerType {
  WIDTH,
  HEIGHT,
  BORDER_RADIUS,
  BACKGROUND_COLOR,
}

export interface IContainerProps {
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor: string;
  canvasColor: string;
}

export interface IBoxShadowState {
  boxShadows: IBoxShadowProps[];
  containerProps: IContainerProps;
}

export interface IShadowContainerContext {
  contextState: IBoxShadowState;
  addNewShadow: () => void;
  removeShadow: (id: string) => void;
  setShadowProperty: (
    id: string,
    key: keyof IBoxShadowProps,
    value: IBoxShadowProps[keyof IBoxShadowProps]
  ) => void;
  setContainerProperty: <K extends keyof IContainerProps>(
    key: K,
    value: IContainerProps[K]
  ) => void;
}
