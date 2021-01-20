import { StandardTableColumnGroupConfig } from "../config/StandardTableColumnGroupConfig";
import { createContext, useContext, useMemo } from "react";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";

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
  const config = useStandardTableConfig();
  const groupConfigs = useGroupConfigsForRows();
  let offset = 0;
  if (config.enableExpandCollapse) {
    offset++;
  }
  if (config.showRowCheckbox) {
    offset++;
  }
  return (
    offset +
    useMemo(
      () =>
        groupConfigs
          .map((c) => c.columnOrder.length)
          .reduce((sum, item) => sum + item, 0),
      [groupConfigs]
    )
  );
};
