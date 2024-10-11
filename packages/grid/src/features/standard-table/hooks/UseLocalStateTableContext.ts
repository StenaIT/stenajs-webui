import { useMemo, useReducer } from "react";
import { TableContext } from "../context/StandardTableStateContext";
import { createInternalStandardTableActions } from "../redux/StandardTableActionsAndSelectors";
import {
  createStandardTableInitialState,
  createStandardTableReducer,
  StandardTableReducer,
  StandardTableState,
} from "../redux/StandardTableReducer";
import { createStandardTableActions } from "../util/ActionsFactory";

export const useLocalStateTableContext = <TColumnKey extends string>(
  tableId: string,
  initialState: StandardTableState<TColumnKey> = createStandardTableInitialState<TColumnKey>(),
) => {
  const [state, dispatch] = useReducer<StandardTableReducer<TColumnKey>>(
    createStandardTableReducer<TColumnKey>(tableId),
    initialState,
  );

  const actions = useMemo(
    () =>
      createStandardTableActions(
        tableId,
        createInternalStandardTableActions<TColumnKey>(),
      ),
    [tableId],
  );

  const tableContext = useMemo<TableContext<TColumnKey>>(
    () => ({
      dispatch,
      actions,
      state,
    }),
    [state, actions, dispatch],
  );

  return {
    tableContext,
  };
};
