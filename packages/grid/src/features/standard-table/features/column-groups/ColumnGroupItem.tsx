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
  return (
    <>
      {groupConfig.columnOrder.map((columnId, index) => {
        return (
          <ColumnInGroup<TColumnKey>
            groupConfig={groupConfig}
            columnId={columnId}
            key={columnId}
            isFirstInGroup={index === 0}
            borderFromGroup={getCellBorderFromGroup(
              groupIndex,
              index,
              groupConfig.borderLeft
            )}
          />
        );
      })}
    </>
  );
});
