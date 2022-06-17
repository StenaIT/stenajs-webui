import * as React from "react";
import { CSSProperties, useMemo } from "react";
import { Indent, Row, Text } from "@stenajs-webui/core";
import { getCellBorder } from "../../../util/CellBorderCalculator";
import { useColumnConfigById } from "../../../hooks/UseColumnConfigById";
import { useStickyPropsPerColumnContext } from "../../../context/StickyPropsPerColumnContext";

interface SummaryCellProps<TItem> {
  items: Array<TItem>;
  columnId: string;
  borderFromGroup?: boolean | string;
  disableBorderLeft: boolean;
  colSpan: number;
}

export const SummaryCell = React.memo(function SummaryCell<TItem>({
  columnId,
  items,
  disableBorderLeft,
  borderFromGroup,
  colSpan,
}: SummaryCellProps<TItem>) {
  const stickyPropsPerColumnContext = useStickyPropsPerColumnContext();
  const {
    renderSummaryCell,
    summaryText,
    borderLeft,
    zIndex,
    width,
    minWidth,
    justifyContentCell,
  } = useColumnConfigById(columnId);

  const activeBorderLeft = getCellBorder(
    borderFromGroup,
    disableBorderLeft,
    borderLeft
  );

  const stickyProps = stickyPropsPerColumnContext[columnId];

  const currentZIndex = stickyProps.sticky
    ? zIndex ?? "var(--swui-sticky-column-z-index)"
    : zIndex ?? 1;

  const shadow =
    stickyProps.sticky &&
    stickyProps.type === "last-group" &&
    stickyProps.isFirstColumnInLastGroup
      ? "var(--swui-sticky-column-shadow-left)"
      : stickyProps.sticky && stickyProps.type === "column" && stickyProps.right
      ? "var(--swui-sticky-column-shadow-left)"
      : stickyProps.sticky
      ? "var(--swui-sticky-column-shadow-right)"
      : undefined;

  const text = useMemo(() => summaryText?.({ items }), [items, summaryText]);
  const renderResult = useMemo(
    () => renderSummaryCell?.({ items, text }),
    [items, renderSummaryCell, text]
  );

  return (
    <td
      colSpan={colSpan}
      style={{
        borderLeft: activeBorderLeft,
        position: stickyProps.sticky ? "sticky" : undefined,
        left: stickyProps.sticky ? stickyProps.left : undefined,
        right: stickyProps.sticky ? stickyProps.right : undefined,
        boxShadow: shadow,
        zIndex: currentZIndex as CSSProperties["zIndex"],
        height: "var(--current-row-height)",
      }}
    >
      <Row
        width={width}
        minWidth={minWidth}
        height={"inherit"}
        overflow={"hidden"}
        justifyContent={justifyContentCell}
        alignItems={"center"}
      >
        {renderSummaryCell ? (
          renderResult
        ) : (
          <Indent>
            <Text variant={"bold"}>{text}</Text>
          </Indent>
        )}
      </Row>
    </td>
  );
});
