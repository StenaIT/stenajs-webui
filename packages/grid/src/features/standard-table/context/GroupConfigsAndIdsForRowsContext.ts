import { createContext, useContext, useMemo } from "react";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { GroupConfigAndId } from "../features/column-groups/ColumnGroupFactory";

export const GroupConfigsAndIdsForRowsContext = createContext<
  Array<GroupConfigAndId<any>>
>([]);

export const useGroupConfigsAndIdsForRows = <
  TColumnKey extends string
>(): Array<GroupConfigAndId<TColumnKey>> =>
  useContext<Array<GroupConfigAndId<TColumnKey>>>(
    GroupConfigsAndIdsForRowsContext
  );

export const useTotalNumColumnsForRows = () => {
  const config = useStandardTableConfig();
  const groupConfigsAndIds = useGroupConfigsAndIdsForRows();
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
        groupConfigsAndIds
          .map((c) => c.groupConfig.columnOrder.length)
          .reduce((sum, item) => sum + item, 0),
      [groupConfigsAndIds]
    )
  );
};
