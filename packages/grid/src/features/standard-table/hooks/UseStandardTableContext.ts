import { useContext } from "react";
import {
  StandardTableContext,
  StandardValueContextValue
} from "../context/StandardTableContext";

export const useStandardTableContext = <
  TItem,
  TColumnKeys extends string
>(): StandardValueContextValue<TItem, TColumnKeys> => {
  const context = useContext(StandardTableContext) as StandardValueContextValue<
    TItem,
    TColumnKeys
  >;
  return context;
};
