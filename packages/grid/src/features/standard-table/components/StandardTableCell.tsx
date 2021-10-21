import * as React from "react";
import {
  CSSProperties,
  KeyboardEventHandler,
  useCallback,
  useMemo,
} from "react";
import { useGridCell } from "../../grid-cell/hooks/UseGridCell";
import { useOnKeyDownContext } from "../context/OnKeyDownContext";
import { useStickyPropsPerColumnContext } from "../context/StickyPropsPerColumnContext";
import { useColumnIndexPerColumnIdContext } from "../features/column-index-per-column-id/ColumnIndexPerColumnIdContext";
import { useCellBackgroundByColumnId } from "../hooks/UseCellBackground";
import { useColumnConfigById } from "../hooks/UseColumnConfigById";
import {
  useStandardTableConfig,
  useStandardTableId,
  useStandardTableState,
} from "../hooks/UseStandardTableConfig";
import { getCellBorder } from "../util/CellBorderCalculator";
import { formatValueLabel } from "../util/LabelFormatter";
import { StandardTableCellUi } from "./StandardTableCellUi";
import { TextCell } from "./TextCell";

export interface StandardTableCellProps<TItem> {
  columnId: string;
  item: TItem;
  rowIndex: number;
  colIndex: number;
  numRows: number;
  borderFromGroup?: boolean | string;
  disableBorderLeft?: boolean;
}

export const StandardTableCell = React.memo(function StandardTableCell<TItem>({
  columnId,
  item,
  colIndex,
  rowIndex,
  numRows,
  borderFromGroup,
  disableBorderLeft,
}: StandardTableCellProps<TItem>) {
  const {
    keyResolver,
    enableGridCell,
    gridCellOptions: gridCellOptionsForTable,
  } = useStandardTableConfig();

  const selectedIds = useStandardTableState().selectedIds.selectedIds;
  const tableId = useStandardTableId();
  const onKeyDownTable = useOnKeyDownContext();
  const { numNavigableColumns } = useColumnIndexPerColumnIdContext();
  const stickyPropsPerColumnContext = useStickyPropsPerColumnContext();

  const isSelected = useMemo(() => {
    const itemId = keyResolver(item);
    return selectedIds.indexOf(itemId) >= 0;
  }, [item, keyResolver, selectedIds]);

  const {
    itemValueResolver,
    itemLabelFormatter,
    width,
    minWidth,
    justifyContentCell = "flex-start",
    borderLeft,
    renderCell,
    gridCellOptions: gridCellOptionsForColumn,
    isEditable,
    onChange,
    onKeyDown: onKeyDownCell,
    disableGridCell,
    zIndex,
  } = useColumnConfigById(columnId);

  const itemValue = useMemo(() => {
    if (itemValueResolver) {
      return itemValueResolver(item);
    }
    if (columnId in item) {
      return (item as any)[columnId];
    }
    return "";
  }, [itemValueResolver, item, columnId]);

  const label = useMemo<string>(
    () =>
      itemLabelFormatter
        ? itemLabelFormatter(itemValue, item)
        : formatValueLabel(itemValue),
    [itemValue, itemLabelFormatter, item]
  );

  const editable =
    typeof isEditable === "boolean"
      ? isEditable
      : isEditable
      ? isEditable(item)
      : undefined;

  const onKeyDownHandler = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (ev) => {
      onKeyDownTable?.(ev, { columnId, item });
      onKeyDownCell?.(ev, { columnId, item });
      if (onKeyDownTable || onKeyDownCell) {
        ev.stopPropagation();
        ev.preventDefault();
      }
    },
    [onKeyDownTable, columnId, item, onKeyDownCell]
  );

  const gridCell = useGridCell<string>(label, {
    colIndex,
    rowIndex,
    numRows,
    numCols: numNavigableColumns,
    tableId,
    isEditable: editable,
    onChange: onChange
      ? (value: string | undefined) => onChange(item, value)
      : undefined,
    ...gridCellOptionsForTable,
    ...gridCellOptionsForColumn,
  });

  const stickyProps = stickyPropsPerColumnContext[columnId];

  const background = useCellBackgroundByColumnId(columnId, item) ?? "inherit";

  const currentZIndex = stickyProps.sticky
    ? zIndex ?? "var(--swui-sticky-column-z-index)"
    : zIndex ?? 1;

  const content = useMemo(
    () =>
      renderCell ? (
        renderCell({
          label,
          value: itemValue,
          item,
          gridCell,
          isEditable: editable,
          isSelected,
          zIndex: currentZIndex,
        })
      ) : (
        <TextCell label={label} />
      ),
    [
      renderCell,
      label,
      itemValue,
      item,
      gridCell,
      editable,
      isSelected,
      currentZIndex,
    ]
  );

  const activeBorderLeft = getCellBorder(
    borderFromGroup,
    disableBorderLeft,
    borderLeft
  );

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

  return (
    <td
      style={{
        borderLeft: activeBorderLeft,
        position: stickyProps.sticky ? "sticky" : undefined,
        left: stickyProps.sticky ? stickyProps.left : undefined,
        right: stickyProps.sticky ? stickyProps.right : undefined,
        boxShadow: shadow,
        zIndex: currentZIndex as CSSProperties["zIndex"],
        height: "var(--current-row-height)",
        background: background,
      }}
    >
      <StandardTableCellUi
        enableGridCell={enableGridCell && !disableGridCell}
        gridCellRequiredProps={gridCell.requiredProps}
        isEditing={gridCell.isEditing}
        width={width}
        minWidth={minWidth}
        justifyContent={justifyContentCell}
        onKeyDown={onKeyDownHandler}
      >
        {content}
      </StandardTableCellUi>
    </td>
  );
});
