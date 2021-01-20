import { createContext, Dispatch } from "react";
import { StandardTableConfig } from "../config/StandardTableConfig";
import { StandardTableState } from "../redux/StandardTableReducer";
import {
  StandardTableAction,
  StandardTableActions,
} from "../util/ActionsFactory";
import { InternalStandardTableAction } from "../redux/StandardTableActionsAndSelectors";

export interface StandardTableInternalActionsContext<
  TColumnKey extends string
> {
  dispatch: Dispatch<StandardTableAction<TColumnKey>>;
  actions: StandardTableActions<TColumnKey>;
}

/**
 * A combination of dispatch, state and actions. This is used to
 * connect the table to a state.
 */
export interface TableContext<TColumnKey extends string> {
  dispatch: Dispatch<InternalStandardTableAction<TColumnKey>>;
  state: StandardTableState<TColumnKey>;
  actions: StandardTableActions<TColumnKey>;
}

export const StandardTableTableIdContext = createContext<string>("");

export const StandardTableStateContext = createContext<StandardTableState<any>>(
  undefined as any
);

export const StandardTableActionsContext = createContext<
  StandardTableInternalActionsContext<any>
>(undefined as any);

export const StandardTableConfigContext = createContext<
  StandardTableConfig<any, any, any>
>(undefined as any);
