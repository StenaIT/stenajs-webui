import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { Heading, Indent, Row, Space } from "@stenajs-webui/core";
import { Icon, InputSpinner } from "@stenajs-webui/elements";
import { cssColor } from "@stenajs-webui/theme";
import { Tooltip } from "@stenajs-webui/tooltip";
import * as React from "react";
import { CSSProperties } from "react";
import { StandardTableColumnGroupConfig } from "../../config/StandardTableColumnGroupConfig";
import { useColumnConfigById } from "../../hooks/UseColumnConfigById";
import { useStandardTableConfig } from "../../hooks/UseStandardTableConfig";

interface ColumnGroupColumnItemProps<TColumnKey extends string> {
  groupConfig: StandardTableColumnGroupConfig<TColumnKey>;
  columnId: TColumnKey;
  isFirstGroup: boolean;
  isLastGroup: boolean;
  borderFromGroup?: string;
  colSpan: number;
}

export const ColumnInGroup = function ColumnGroupColumnItem<
  TColumnKey extends string
>({
  columnId,
  groupConfig,
  borderFromGroup,
  colSpan,
  isFirstGroup,
  isLastGroup,
}: ColumnGroupColumnItemProps<TColumnKey>) {
  const {
    label,
    render,
    contentLeft,
    contentRight,
    loading,
    error,
  } = groupConfig;
  const { width, minWidth, zIndex, borderLeft } = useColumnConfigById(columnId);
  const config = useStandardTableConfig();
  const { stickyHeader, headerRowOffsetTop } = config;

  const stickyColumnGroups =
    "columnGroupOrder" in config ? config.stickyColumnGroups : undefined;

  const activeBorder = getActiveBorder(borderFromGroup, borderLeft);
  const isStickyLeft =
    isFirstGroup &&
    (stickyColumnGroups === "first" || stickyColumnGroups === "both");
  const isStickyRight =
    isLastGroup &&
    (stickyColumnGroups === "last" || stickyColumnGroups === "both");

  const isSticky = isStickyLeft || isStickyRight || stickyHeader;

  return (
    <th
      colSpan={colSpan}
      style={
        {
          position: isSticky ? "sticky" : undefined,
          height: "var(--current-row-height)",
          width: width,
          minWidth: minWidth ?? width ?? "20px",
          background: isSticky ? "white" : "transparent",
          left: isStickyLeft ? `var(--current-left-offset)` : undefined,
          right: isStickyRight ? `0px` : undefined,
          top: stickyHeader ? headerRowOffsetTop ?? "0px" : undefined,
          borderLeft: activeBorder,
          zIndex:
            isStickyLeft || isStickyRight
              ? "var(--swui-sticky-column-group-label-z-index)"
              : stickyHeader
              ? zIndex ?? "var(--swui-sticky-header-column-group-z-index)"
              : zIndex ?? 1,
          boxShadow: isStickyLeft
            ? "var(--swui-sticky-column-shadow-right)"
            : isStickyRight
            ? "var(--swui-sticky-column-shadow-left)"
            : undefined,
        } as CSSProperties
      }
    >
      <Row alignItems={"center"}>
        {
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
        }
      </Row>
    </th>
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
