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
  TColumnKey extends string,
  TColumnGroupKey extends string
>(): StandardTableConfig<TItem, TColumnKey, TColumnGroupKey> =>
  useContext(StandardTableConfigContext);

export const useStandardTableState = <
  TColumnKey extends string
>(): StandardTableState<TColumnKey> => useContext(StandardTableStateContext);

export const useStandardTableActions = <
  TColumnKey extends string
>(): StandardTableInternalActionsContext<TColumnKey> =>
  useContext(StandardTableActionsContext);
