"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextAuthProvider from "@/context/AuthContext";
import { DialogContextProvider } from "@/context/DialogContext";
import ShadowProvider from "@/context/shadowContainerContext";

type LayoutProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: LayoutProps) => {
  const queryClient = new QueryClient();

  return (
    <NextAuthProvider>
      <QueryClientProvider client={queryClient}>
        <DialogContextProvider>
          <ShadowProvider> {children}</ShadowProvider>
        </DialogContextProvider>
      </QueryClientProvider>
    </NextAuthProvider>
  );
};

export default Provider;
