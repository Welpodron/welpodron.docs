"use client";

import { useInitSearch } from "@/hooks/useInitSearch/useInitSearch";

export type InitializerPropsType = {
  children: React.ReactNode;
};

export const Initializer = ({ children }: InitializerPropsType) => {
  useInitSearch();

  return children;
};

Initializer.displayName = "Initializer";
