import { useMemo, useReducer } from "react";
import { useDomId } from "@stenajs-webui/core";
import { TableContext } from "../context/StandardTableStateContext";
import { createStandardTableActions } from "../redux/StandardTableActionsAndSelectors";
import {
  createStandardTableReducer,
  standardTableInitialState,
  StandardTableReducer
} from "../redux/StandardTableReducer";

export const useLocalStateTableContext = <TColumnKeys extends string>() => {
  const tableId = useDomId();

  const reducer = useMemo(
    () => createStandardTableReducer<TColumnKeys>(tableId),
    [tableId]
  );

  const [state, dispatch] = useReducer<StandardTableReducer<TColumnKeys>>(
    reducer,
    standardTableInitialState
  );

  const actions = useMemo(
    () => createStandardTableActions<TColumnKeys>(tableId),
    [tableId]
  );

  const tableContext = useMemo<TableContext<TColumnKeys>>(
    () => ({
      dispatch,
      actions,
      state
    }),
    [state, actions, dispatch]
  );

  return {
    tableContext
  };
};
