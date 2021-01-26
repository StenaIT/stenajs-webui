import { Box, Heading, Indent, Row, Space } from "@stenajs-webui/core";
import { InputSpinner } from "@stenajs-webui/elements";
import * as React from "react";
import { StandardTableColumnGroupConfig } from "../../config/StandardTableColumnGroupConfig";
import { useColumnConfigById } from "../../hooks/UseColumnConfigById";

interface ColumnGroupColumnItemProps<TColumnKey extends string> {
  groupConfig: StandardTableColumnGroupConfig<TColumnKey>;
  columnId: TColumnKey;
  isFirstInGroup: boolean;
  borderFromGroup?: string;
}

export const GroupedColumn = function ColumnGroupColumnItem<
  TColumnKey extends string
>({
  columnId,
  groupConfig,
  isFirstInGroup,
  borderFromGroup,
}: ColumnGroupColumnItemProps<TColumnKey>) {
  const { label, render, contentLeft, contentRight, loading } = groupConfig;
  const { flex = 1, width, minWidth, zIndex, left } = useColumnConfigById(
    columnId
  );

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
          <Heading variant={"h5"} whiteSpace={"nowrap"}>
            {label}
          </Heading>
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
    <Box
      position={"relative"}
      height={"var(--current-row-height)"}
      width={width}
      minWidth={minWidth ?? width}
      justifyContent={"flex-start"}
      flex={width ? undefined : flex}
      background={content ? "white" : "transparent"}
      zIndex={zIndex}
      left={left}
      borderLeft={borderFromGroup}
    >
      {content && (
        <Row
          height={"var(--current-row-height)"}
          position={"absolute"}
          top={0}
          left={0}
          alignItems={"center"}
        >
          {content}
        </Row>
      )}
    </Box>
  );
};
