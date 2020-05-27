import { useMemo, useReducer } from "react";
import { TableContext } from "../context/StandardTableStateContext";
import { createStandardTableActions } from "../redux/StandardTableActionsAndSelectors";
import {
  createStandardTableReducer,
  standardTableInitialState,
  StandardTableReducer
} from "../redux/StandardTableReducer";

export const useLocalStateTableContext = <TColumnKeys extends string>(
  tableId: string
) => {
  const [state, dispatch] = useReducer<StandardTableReducer<TColumnKeys>>(
    createStandardTableReducer<TColumnKeys>(tableId),
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
