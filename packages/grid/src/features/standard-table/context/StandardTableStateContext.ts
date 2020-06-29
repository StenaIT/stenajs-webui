import { createContext, Dispatch } from "react";
import { StandardTableConfig } from "../config/StandardTableConfig";
import {
  StandardTableAction,
  StandardTableActions
} from "../redux/StandardTableActionsAndSelectors";
import { StandardTableState } from "../redux/StandardTableReducer";
import { ReducerIdGateAction } from "@stenajs-webui/redux";

export interface StandardTableInternalActionsContext<
  TColumnKeys extends string
> {
  dispatch: Dispatch<ReducerIdGateAction<StandardTableAction<TColumnKeys>>>;
  actions: StandardTableActions<TColumnKeys>;
}

/**
 * A combination of dispatch, state and actions. This is used to
 * connect the table to a state.
 */
export interface TableContext<TColumnKeys extends string> {
  dispatch: Dispatch<ReducerIdGateAction<StandardTableAction<TColumnKeys>>>;
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
