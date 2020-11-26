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

export const useLocalStateTableContext = <TColumnKeys extends string>(
  tableId: string,
  initialState: StandardTableState<TColumnKeys> = createStandardTableInitialState<TColumnKeys>()
) => {
  const [state, dispatch] = useReducer<StandardTableReducer<TColumnKeys>>(
    createStandardTableReducer<TColumnKeys>(tableId),
    initialState
  );

  const actions = useMemo(
    () =>
      createStandardTableActions(
        tableId,
        createInternalStandardTableActions<TColumnKeys>()
      ),
    [tableId]
  );

  const tableContext = useMemo<TableContext<TColumnKeys>>(
    () => ({
      dispatch,
      actions,
      state,
    }),
    [state, actions, dispatch]
  );

  return {
    tableContext,
  };
};
