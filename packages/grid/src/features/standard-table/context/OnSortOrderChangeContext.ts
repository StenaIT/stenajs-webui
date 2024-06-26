import { createContext, useContext } from "react";
import { StandardTableOnSortOrderChange } from "../types/StandardTableEvents";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const OnSortOrderChangeContext = createContext<
  StandardTableOnSortOrderChange<any> | undefined
>(undefined);

export const useOnSortOrderChangeContext = <TColumnKey extends string>() =>
  useContext(OnSortOrderChangeContext) as
    | StandardTableOnSortOrderChange<TColumnKey>
    | undefined;
