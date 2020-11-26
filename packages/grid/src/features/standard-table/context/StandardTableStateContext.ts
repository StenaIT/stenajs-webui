import { createContext, Dispatch } from "react";
import type { StandardTableConfig } from "../config/StandardTableConfig";
import type { StandardTableState } from "../redux/StandardTableReducer";
import type {
  StandardTableAction,
  StandardTableActions,
} from "../util/ActionsFactory";
import type { InternalStandardTableAction } from "../redux/StandardTableActionsAndSelectors";

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
  dispatch: Dispatch<InternalStandardTableAction<TColumnKeys>>;
  state: StandardTableState<TColumnKeys>;
  actions: StandardTableActions<TColumnKeys>;
}

export const StandardTableTableIdContext = createContext<string>("");

export const StandardTableStateContext = createContext<StandardTableState<any>>(
  undefined as any
);

export const StandardTableActionsContext = createContext<
  StandardTableInternalActionsContext<any>
>(undefined as any);

export const StandardTableConfigContext = createContext<
  StandardTableConfig<any, any>
>(undefined as any);
