import * as React from "react";
import { StandardTableColumnGroupConfig } from "../../config/StandardTableColumnGroupConfig";
import { getCellBorderFromGroup } from "../../util/CellBorderCalculator";
import { ColumnInGroup } from "./ColumnInGroup";

interface ColumnGroupItemProps<TColumnKey extends string> {
  groupConfig: StandardTableColumnGroupConfig<TColumnKey>;
  groupIndex: number;
}

export const ColumnGroupItem = React.memo(function ColumnGroupItem<
  TColumnKey extends string
>({ groupConfig, groupIndex }: ColumnGroupItemProps<TColumnKey>) {
  const columnId = groupConfig.columnOrder[0];
  return (
    <ColumnInGroup<TColumnKey>
      groupConfig={groupConfig}
      columnId={columnId}
      key={columnId}
      colSpan={groupConfig.columnOrder.length}
      isFirstInGroup={true}
      borderFromGroup={getCellBorderFromGroup(
        groupIndex,
        0,
        groupConfig.borderLeft
      )}
    />
  );
});
