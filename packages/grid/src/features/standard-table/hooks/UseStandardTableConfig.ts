import { useContext } from "react";
import { StandardTableConfig } from "../config/StandardTableConfig";
import {
  StandardTableActionsContext,
  StandardTableConfigContext,
  StandardTableInternalActionsContext,
  StandardTableStateContext,
  StandardTableTableIdContext
} from "../context/StandardTableStateContext";
import { StandardTableState } from "../redux/StandardTableReducer";

export const useStandardTableId = (): string => {
  return useContext(StandardTableTableIdContext) as string;
};

export const useStandardTableConfig = <
  TItem,
  TColumnKeys extends string
>(): StandardTableConfig<TItem, TColumnKeys> => {
  const context = useContext(StandardTableConfigContext) as StandardTableConfig<
    TItem,
    TColumnKeys
  >;
  return context;
};

export const useStandardTableState = <
  TColumnKeys extends string
>(): StandardTableState<TColumnKeys> => {
  const context = useContext(StandardTableStateContext) as StandardTableState<
    TColumnKeys
  >;
  return context;
};

export const useStandardTableActions = <
  TColumnKeys extends string
>(): StandardTableInternalActionsContext<TColumnKeys> => {
  const context = useContext(
    StandardTableActionsContext
  ) as StandardTableInternalActionsContext<TColumnKeys>;
  return context;
};
