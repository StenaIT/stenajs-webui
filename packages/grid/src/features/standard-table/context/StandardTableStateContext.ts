import { createContext, Dispatch } from "react";
import { StandardTableConfig } from "../config/StandardTableConfig";
import {
  StandardTableAction,
  StandardTableActions
} from "../redux/StandardTableActionsAndSelectors";
import { StandardTableState } from "../redux/StandardTableReducer";

export interface StandardTableInternalActionsContext<
  TColumnKeys extends string
> {
  dispatch: Dispatch<StandardTableAction<TColumnKeys>>;
  actions: StandardTableActions<TColumnKeys>;
}

/**
 * A combination of dispatch, state and actions. This is used to
 * connect the table to a state.
 */
export interface TableContext<TColumnKeys extends string> {
  dispatch: Dispatch<StandardTableAction<TColumnKeys>>;
  state: StandardTableState<TColumnKeys>;
  actions: StandardTableActions<TColumnKeys>;
}

export const StandardTableStateContext = createContext<
  StandardTableState<any> | undefined
>(undefined);

export const StandardTableActionsContext = createContext<
  StandardTableInternalActionsContext<any> | undefined
>(undefined);

export const StandardTableConfigContext = createContext<
  StandardTableConfig<any, any> | undefined
>(undefined);
