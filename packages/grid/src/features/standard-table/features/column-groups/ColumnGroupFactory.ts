import { compact } from "lodash";
import { StandardTableColumnGroupConfig } from "../../config/StandardTableColumnGroupConfig";
import {
  StandardTableConfigWithGroups,
  StandardTableConfigWithNoGroups,
} from "../../config/StandardTableConfig";

export const createColumnGroupConfigsForRows = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>(
  columnGroups:
    | StandardTableConfigWithGroups<
        TItem,
        TColumnKey,
        TColumnGroupKey
      >["columnGroups"]
    | undefined,
  columnGroupOrder:
    | StandardTableConfigWithGroups<
        TItem,
        TColumnKey,
        TColumnGroupKey
      >["columnGroupOrder"]
    | undefined,
  columnOrder:
    | StandardTableConfigWithNoGroups<TItem, TColumnKey>["columnOrder"]
    | undefined
): Array<StandardTableColumnGroupConfig<TColumnKey>> => {
  if (columnGroups) {
    return compact(
      columnGroupOrder?.map((groupId) => columnGroups?.[groupId]) ?? []
    ).filter((columnGroup) => columnGroup.columnOrder.length > 0);
  }
  return [
    {
      label: "",
      columnOrder: columnOrder ?? [],
    },
  ];
};
