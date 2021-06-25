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
  isFirstInGroup: boolean;
  borderFromGroup?: string;
  colSpan: number;
}

export const ColumnInGroup = function ColumnGroupColumnItem<
  TColumnKey extends string
>({
  columnId,
  groupConfig,
  isFirstInGroup,
  borderFromGroup,
  colSpan,
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
    width,
    minWidth,
    zIndex,
    left,
    sticky: stickyColumn,
    borderLeft,
  } = useColumnConfigById(columnId);
  const { stickyHeader, headerRowOffsetTop } = useStandardTableConfig();

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
  const isSticky = stickyColumn || stickyHeader;

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
          left: stickyColumn
            ? `calc(var(--current-left-offset) + ${left})`
            : undefined,
          top: stickyHeader ? headerRowOffsetTop ?? "0px" : undefined,
          borderLeft: activeBorder,
          zIndex: isSticky
            ? zIndex ?? "var(--swui-sticky-header-column-group-z-index)"
            : zIndex ?? 1,
          boxShadow: stickyColumn
            ? "var(--swui-sticky-column-shadow-right)"
            : undefined,
        } as CSSProperties
      }
    >
      <Row alignItems={"center"}>{content}</Row>
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
