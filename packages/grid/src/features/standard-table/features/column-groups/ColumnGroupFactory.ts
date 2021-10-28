import { compact } from "lodash";
import { StandardTableColumnGroupConfig } from "../../config/StandardTableColumnGroupConfig";
import {
  StandardTableConfigWithGroups,
  StandardTableConfigWithNoGroups,
} from "../../config/StandardTableConfig";

export interface GroupConfigAndId<TColumnKey extends string> {
  groupId: string;
  groupConfig: StandardTableColumnGroupConfig<TColumnKey>;
}

export const createGroupConfigAndIdsForRows = <
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
): Array<GroupConfigAndId<TColumnKey>> => {
  if (columnGroups) {
    return compact(
      columnGroupOrder?.map((groupId) => {
        const groupConfig = columnGroups?.[groupId];
        return {
          groupId,
          groupConfig,
        };
      }) ?? []
    )
      .filter((item) => (item.groupConfig?.columnOrder.length ?? 0) > 0)
      .map<GroupConfigAndId<TColumnKey>>(
        (p) => p as GroupConfigAndId<TColumnKey>
      );
  }
  return [
    {
      groupId: "virtual",
      groupConfig: {
        label: "",
        columnOrder: columnOrder ?? [],
      },
    },
  ];
};
