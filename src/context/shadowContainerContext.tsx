"use client";
import React, { createContext, useState } from "react";
import { nanoid } from "nanoid";
import {
  IBoxShadowProps,
  IBoxShadowState,
  IContainerProps,
  IShadowContainerContext,
} from "@/types";

export const ShadowContainerContext = createContext<IShadowContainerContext>(
  {} as IShadowContainerContext
);

const defaultBoxShadowProps: IBoxShadowProps = {
  id: nanoid(),
  horizontalOffset: 0,
  verticalOffset: 5,
  blurRadius: 10,
  spreadRadius: -5,
  color: "#000000",
  active: true,
  inset: false,
};

const defaultContainerProps: IContainerProps = {
  width: 200,
  height: 200,
  borderRadius: 1,
  backgroundColor: "#ffffff",
  canvasColor: "#f9fafb",
};

const initialState: IBoxShadowState = {
  boxShadows: [{ ...defaultBoxShadowProps }],
  containerProps: { ...defaultContainerProps },
};

interface IContextProviderProps {
  children: React.ReactNode;
}

export default function ContextProvider({ children }: IContextProviderProps) {
  const [contextState, setContextState] =
    useState<IBoxShadowState>(initialState);

  const addNewShadow = () => {
    setContextState((prevState) => ({
      ...prevState,
      boxShadows: [
        ...prevState.boxShadows,
        { ...defaultBoxShadowProps, id: nanoid() },
      ],
    }));
  };

  const removeShadow = (id: string) => {
    setContextState((prevState) => ({
      ...prevState,
      boxShadows: prevState.boxShadows.filter(
        (currShadow) => currShadow.id !== id
      ),
    }));
  };

  const setShadowProperty = <K extends keyof IBoxShadowProps>(
    id: string,
    showKey: K,
    value: IBoxShadowProps[K]
  ): void => {
    const boxShadows = [...contextState.boxShadows];
    const index = boxShadows.findIndex(
      (specificShadow) => specificShadow.id === id
    );
    if (index >= 0) {
      // boxShadows[index] --> access specifc box shadow object
      //  boxShadows[index][showKey] --> and update the value of showKey(key of box shadow)
      boxShadows[index][showKey] = value;
      setContextState((prevState) => ({
        ...prevState,
        boxShadows: [...boxShadows],
      }));
    }
  };

  const setContainerProperty = <K extends keyof IContainerProps>(
    key: K,
    value: IContainerProps[K]
  ): void => {
    setContextState((prevState) => ({
      ...prevState,
      containerProps: { ...prevState.containerProps, [key]: value },
    }));
  };

  return (
    <ShadowContainerContext.Provider
      value={{
        contextState,
        addNewShadow,
        removeShadow,
        setShadowProperty,
        setContainerProperty,
      }}
    >
      {children}
    </ShadowContainerContext.Provider>
  );
}
