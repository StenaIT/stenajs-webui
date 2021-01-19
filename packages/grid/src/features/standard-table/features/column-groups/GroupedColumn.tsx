import { Heading, Indent, Space } from "@stenajs-webui/core";
import { InputSpinner } from "@stenajs-webui/elements";
import * as React from "react";
import { StandardTableCellUi } from "../../components/StandardTableCellUi";
import { StandardTableColumnGroupConfig } from "../../config/StandardTableColumnGroupConfig";
import { useColumnConfigById } from "../../hooks/UseColumnConfigById";

interface ColumnGroupColumnItemProps<TColumnKey extends string> {
  groupConfig: StandardTableColumnGroupConfig<TColumnKey>;
  columnId: TColumnKey;
  isFirstInGroup: boolean;
}

export const GroupedColumn = function ColumnGroupColumnItem<
  TColumnKey extends string
>({
  columnId,
  groupConfig,
  isFirstInGroup,
}: ColumnGroupColumnItemProps<TColumnKey>) {
  const { label, render, contentLeft, contentRight, loading } = groupConfig;

  const {
    flex = 1,
    width,
    minWidth,
    sticky,
    zIndex,
    left,
  } = useColumnConfigById(columnId);

  const content = isFirstInGroup ? (
    <>
      {contentLeft && (
        <>
          {contentLeft}
          <Space num={0.5} />
        </>
      )}
      {render ? (
        render(groupConfig)
      ) : (
        <Indent>
          <Heading variant={"h5"}>{label}</Heading>
        </Indent>
      )}
      {contentRight && (
        <>
          <Space num={0.5} />
          {contentRight}
        </>
      )}
      {loading && (
        <>
          <Indent />
          <InputSpinner />
        </>
      )}
    </>
  ) : null;

  return (
    <StandardTableCellUi
      isEditing={false}
      width={width}
      minWidth={minWidth}
      justifyContent={"flex-start"}
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
