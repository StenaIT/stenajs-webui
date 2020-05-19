import { useContext } from "react";
import {
  StandardTableContext,
  StandardValueContextValue
} from "../context/StandardTableContext";

export const useStandardTableContext = <
  TStoreState,
  TItem,
  TColumnKeys extends string
>(): StandardValueContextValue<TStoreState, TItem, TColumnKeys> => {
  const context = useContext(StandardTableContext) as StandardValueContextValue<
    TStoreState,
    TItem,
    TColumnKeys
  >;
  return context;
};
