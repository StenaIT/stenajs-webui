import { createContext, useContext } from "react";
import { StandardTableOnKeyDown } from "../types/StandardTableEvents";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const OnKeyDownContext = createContext<
  StandardTableOnKeyDown<any, any> | undefined
>(undefined);

export const useOnKeyDownContext = <TItem, TColumnKey extends string>() =>
  useContext(OnKeyDownContext) as
    | StandardTableOnKeyDown<TItem, TColumnKey>
    | undefined;
