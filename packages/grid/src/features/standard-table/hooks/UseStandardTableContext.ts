import { useContext } from "react";
import {
  StandardTableContext,
  StandardTableInternalContext
} from "../context/StandardTableContext";

export const useStandardTableContext = <
  TItem,
  TColumnKeys extends string
>(): StandardTableInternalContext<TItem, TColumnKeys> => {
  const context = useContext(
    StandardTableContext
  ) as StandardTableInternalContext<TItem, TColumnKeys>;
  return context;
};
