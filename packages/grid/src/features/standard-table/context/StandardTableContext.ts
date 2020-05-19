import { createContext } from "react";
import { StandardTableConfig } from "../config/StandardTableConfig";
import { StandardTableActionsAndSelectors } from "../redux/StandardTableActionsAndSelectors";

export interface StandardValueContextValue<
  TStoreState,
  TItem,
  TColumnKeys extends string
> extends StandardTableActionsAndSelectors<TStoreState, TColumnKeys> {
  config: StandardTableConfig<TItem, TColumnKeys>;
}

export const StandardTableContext = createContext<
  StandardValueContextValue<any, any, any> | undefined
>(undefined);
