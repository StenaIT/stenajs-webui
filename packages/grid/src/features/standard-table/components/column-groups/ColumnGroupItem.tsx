import { Row } from "@stenajs-webui/core";
import * as React from "react";
import { tableBorder } from "../../../../config/TableConfig";
import { StandardTableColumnGroupConfig } from "../../config/StandardTableColumnGroupConfig";
import { ColumnGroupColumnItem } from "./ColumnGroupColumnItem";

interface ColumnGroupItemProps<TColumnKey extends string> {
  groupConfig: StandardTableColumnGroupConfig<TColumnKey>;
  groupIndex: number;
}

export const ColumnGroupItem = React.memo(function ColumnGroupItem<
  TColumnKey extends string
>({ groupConfig, groupIndex }: ColumnGroupItemProps<TColumnKey>) {
  const borderLeft =
    groupIndex === 0
      ? undefined
      : groupConfig.borderLeft === true
      ? tableBorder
      : groupConfig.borderLeft || undefined;

  return (
    <Row background={"inherit"} borderLeft={borderLeft}>
      {groupConfig.columnOrder.map((columnId, index) => (
        <ColumnGroupColumnItem<TColumnKey>
          groupConfig={groupConfig}
          columnId={columnId}
          key={columnId}
          isFirstInGroup={index === 0}
          isFirstGroup={groupIndex === 0}
          groupHasBorderLeft={Boolean(groupConfig.borderLeft)}
        />
      ))}
    </Row>
  );
});
