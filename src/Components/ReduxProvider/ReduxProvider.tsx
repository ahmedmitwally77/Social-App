"use client";
import { myStore } from "@/Store/Store";
import React from "react";
import { Provider } from "react-redux";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={myStore}>{children}</Provider>;
}
