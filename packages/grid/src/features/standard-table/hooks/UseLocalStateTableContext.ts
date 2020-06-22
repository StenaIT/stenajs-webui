import { useMemo, useReducer } from "react";
import { TableContext } from "../context/StandardTableStateContext";
import { createStandardTableActions } from "../redux/StandardTableActionsAndSelectors";
import {
  createStandardTableInitialState,
  createStandardTableReducer,
  StandardTableReducer
} from "../redux/StandardTableReducer";

export const useLocalStateTableContext = <TColumnKeys extends string>(
  tableId: string,
  initialSortOrder?: TColumnKeys,
  initialSortOrderDesc?: boolean
) => {
  const [state, dispatch] = useReducer<StandardTableReducer<TColumnKeys>>(
    createStandardTableReducer<TColumnKeys>(tableId),
    createStandardTableInitialState(initialSortOrder, initialSortOrderDesc)
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
