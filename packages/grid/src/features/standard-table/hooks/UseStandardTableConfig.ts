import { useContext } from "react";
import { StandardTableConfig } from "../config/StandardTableConfig";
import {
  StandardTableActionsContext,
  StandardTableConfigContext,
  StandardTableInternalActionsContext,
  StandardTableStateContext,
  StandardTableTableIdContext,
} from "../context/StandardTableStateContext";
import { StandardTableState } from "../redux/StandardTableReducer";

export const useStandardTableId = (): string =>
  useContext(StandardTableTableIdContext);

export const useStandardTableConfig = <
  TItem,
  TColumnKeys extends string
>(): StandardTableConfig<TItem, TColumnKeys> =>
  useContext(StandardTableConfigContext);

export const useStandardTableState = <
  TColumnKeys extends string
>(): StandardTableState<TColumnKeys> => useContext(StandardTableStateContext);

export const useStandardTableActions = <
  TColumnKeys extends string
>(): StandardTableInternalActionsContext<TColumnKeys> =>
  useContext(StandardTableActionsContext);
