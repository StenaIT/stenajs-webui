import { createContext, useContext } from "react";
import { StickyPropsPerColumn } from "../features/sticky-columns/types";

export const StickyPropsPerColumnContext = createContext<
  StickyPropsPerColumn<string>
>({});

export const useStickyPropsPerColumnContext = () =>
  useContext(StickyPropsPerColumnContext);
