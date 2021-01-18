import { StandardTableColumnGroupConfig } from "../config/StandardTableColumnGroupConfig";
import { createContext, useContext, useMemo } from "react";

export const GroupConfigsForRowsContext = createContext<
  Array<StandardTableColumnGroupConfig<any>>
>([]);

export const useGroupConfigsForRows = <TColumnKey extends string>(): Array<
  StandardTableColumnGroupConfig<TColumnKey>
> =>
  useContext<Array<StandardTableColumnGroupConfig<TColumnKey>>>(
    GroupConfigsForRowsContext
  );

export const useTotalNumColumnsForRows = () => {
  const groupConfigs = useGroupConfigsForRows();
  return useMemo(
    () =>
      groupConfigs
        .map((c) => c.columnOrder.length)
        .reduce((sum, item) => sum + item, 0),
    [groupConfigs]
  );
};
