import { Indent, Text } from "@stenajs-webui/core";
import * as React from "react";
import { StandardTableColumnGroupConfig } from "../../config/StandardTableColumnGroupConfig";
import { useColumnFromConfig } from "../../hooks/UseColumnFromConfig";
import { StandardTableCellUi } from "../StandardTableCellUi";

interface ColumnGroupColumnItemProps<TColumnKey extends string> {
  groupConfig: StandardTableColumnGroupConfig<TColumnKey>;
  columnId: TColumnKey;
  isFirstInGroup: boolean;
  isFirstGroup: boolean;
  groupHasBorderLeft: boolean;
}

export const ColumnGroupColumnItem = function ColumnGroupColumnItem<
  TColumnKey extends string
>({
  columnId,
  groupConfig,
  isFirstInGroup,
  isFirstGroup,
  groupHasBorderLeft,
}: ColumnGroupColumnItemProps<TColumnKey>) {
  const { label, render } = groupConfig;

  const {
    flex = 1,
    width,
    minWidth,
    borderLeft,
    sticky,
    zIndex,
    left,
  } = useColumnFromConfig(columnId);

  const content = isFirstInGroup ? (
    <>
      {render ? (
        render(groupConfig)
      ) : (
        <Indent>
          <Text variant={"bold"}>{label}</Text>
        </Indent>
      )}
    </>
  ) : null;

  const disableBorderLeft =
    (isFirstGroup || groupHasBorderLeft) && isFirstInGroup;

  return (
    <StandardTableCellUi
      isEditing={false}
      width={width}
      minWidth={minWidth}
      justifyContent={"flex-start"}
      borderLeft={disableBorderLeft ? undefined : borderLeft}
      flex={flex}
      background={"inherit"}
      sticky={sticky}
      zIndex={zIndex}
      left={left}
      shadow={sticky ? "var(--swui-sticky-column-shadow-right)" : undefined}
    >
      {content}
    </StandardTableCellUi>
  );
};
