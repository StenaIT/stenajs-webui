import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { Box, Heading, Indent, Row, Space } from "@stenajs-webui/core";
import { Icon, InputSpinner } from "@stenajs-webui/elements";
import { cssColor } from "@stenajs-webui/theme";
import { Tooltip } from "@stenajs-webui/tooltip";
import { Property } from "csstype";
import * as React from "react";
import { StandardTableColumnGroupConfig } from "../../config/StandardTableColumnGroupConfig";
import { useColumnConfigById } from "../../hooks/UseColumnConfigById";

interface ColumnGroupColumnItemProps<TColumnKey extends string> {
  groupConfig: StandardTableColumnGroupConfig<TColumnKey>;
  columnId: TColumnKey;
  isFirstInGroup: boolean;
  borderFromGroup?: string;
}

export const ColumnInGroup = function ColumnGroupColumnItem<
  TColumnKey extends string
>({
  columnId,
  groupConfig,
  isFirstInGroup,
  borderFromGroup,
}: ColumnGroupColumnItemProps<TColumnKey>) {
  const {
    label,
    render,
    contentLeft,
    contentRight,
    loading,
    error,
  } = groupConfig;
  const {
    flex = 1,
    width,
    minWidth,
    zIndex,
    left,
    sticky,
    borderLeft,
  } = useColumnConfigById(columnId);

  const content = isFirstInGroup ? (
    <>
      {contentLeft && (
        <>
          <Space />
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
      {(error || loading) && <Indent />}
      {loading ? (
        <InputSpinner />
      ) : error ? (
        <Tooltip label={error}>
          <Icon
            icon={faExclamationTriangle}
            color={cssColor("--lhds-color-red-500")}
          />
        </Tooltip>
      ) : undefined}
    </>
  ) : null;

  const activeBorder = getActiveBorder(borderFromGroup, borderLeft);

  return (
    <Box
      position={sticky ? "sticky" : undefined}
      height={"var(--current-row-height)"}
      width={width}
      minWidth={minWidth ?? width ?? "20px"}
      justifyContent={"flex-start"}
      flex={width ? undefined : flex}
      background={content || sticky ? "white" : "transparent"}
      left={left}
      borderLeft={activeBorder}
      zIndex={
        sticky
          ? zIndex ?? ("var(--swui-sticky-header-z-index)" as Property.ZIndex)
          : zIndex
      }
      shadow={sticky ? "var(--swui-sticky-column-shadow-right)" : undefined}
    >
      {content && (
        <Box position={"relative"}>
          <Row
            height={"var(--current-row-height)"}
            position={"absolute"}
            top={0}
            left={0}
            alignItems={"center"}
            zIndex={
              "var(--swui-sticky-column-group-label-z-index)" as Property.ZIndex
            }
          >
            {content}
          </Row>
        </Box>
      )}
    </Box>
  );
};

const getActiveBorder = (
  borderFromGroup: string | undefined,
  borderFromColumn: string | boolean | undefined
): string | undefined => {
  if (borderFromGroup) {
    return borderFromGroup;
  }
  if (borderFromColumn) {
    return "1px solid transparent";
  }
  return undefined;
};
