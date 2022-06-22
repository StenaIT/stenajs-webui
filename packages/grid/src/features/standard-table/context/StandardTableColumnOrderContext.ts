import { createContext, useContext } from "react";

export const StandardTableColumnGroupOrderContext = createContext<
  Array<string> | undefined
>(undefined);

export const StandardTableUsingColumnGroupsContext =
  createContext<boolean>(false);

export const useColumnGroupOrderContext = <TColumnGroupKey extends string>() =>
  useContext(StandardTableColumnGroupOrderContext) as Array<TColumnGroupKey>;
