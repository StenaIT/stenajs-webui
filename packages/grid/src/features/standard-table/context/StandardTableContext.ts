import { createContext, Dispatch } from "react";
import { StandardTableConfig } from "../config/StandardTableConfig";
import {
  StandardTableAction,
  StandardTableActions
} from "../redux/StandardTableActionsAndSelectors";
import { StandardTableState } from "../redux/StandardTableReducer";

export interface StandardTableInternalContext<
  TItem,
  TColumnKeys extends string
> extends TableContext<TColumnKeys> {
  config: StandardTableConfig<TItem, TColumnKeys>;
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

export const StandardTableContext = createContext<
  StandardTableInternalContext<any, any> | undefined
>(undefined);
