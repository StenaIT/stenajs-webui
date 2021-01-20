import { StandardTableConfig } from "../../config/StandardTableConfig";
import { StandardTableColumnGroupConfig } from "../../config/StandardTableColumnGroupConfig";
import { compact } from "lodash";

export const createColumnConfigsForRows = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>(
  columnGroups: StandardTableConfig<
    TItem,
    TColumnKey,
    TColumnGroupKey
  >["columnGroups"],
  columnGroupOrder: StandardTableConfig<
    TItem,
    TColumnKey,
    TColumnGroupKey
  >["columnGroupOrder"],
  columnOrder: StandardTableConfig<
    TItem,
    TColumnKey,
    TColumnGroupKey
  >["columnOrder"]
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
