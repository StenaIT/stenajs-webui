import { createContext, Dispatch } from "react";
import { StandardTableConfig } from "../config/StandardTableConfig";
import {
  StandardTableAction,
  StandardTableActions
} from "../redux/StandardTableActionsAndSelectors";
import { StandardTableState } from "../redux/StandardTableReducer";

export interface StandardValueContextValue<TItem, TColumnKeys extends string> {
  config: StandardTableConfig<TItem, TColumnKeys>;
  dispatch: Dispatch<StandardTableAction<TColumnKeys>>;
  state: StandardTableState<TColumnKeys>;
  actions: StandardTableActions<TColumnKeys>;
}

export const StandardTableContext = createContext<
  StandardValueContextValue<any, any> | undefined
>(undefined);
