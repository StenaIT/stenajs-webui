import * as React from "react";
import { useMemo } from "react";
import { useCellBackgroundByColumnId } from "../hooks/UseCellBackground";
import { useColumnFromConfig } from "../hooks/UseColumnFromConfig";
import { useGridCellMemo } from "../hooks/UseGridCellMemo";
import { useStandardTableContext } from "../hooks/UseStandardTableContext";
import { formatValueLabel } from "../util/LabelFormatter";
import { StandardTableCellUi } from "./StandardTableCellUi";
import { TextCell } from "./TextCell";

export interface StandardTableCellProps<TItem> {
  columnId: string;
  item: TItem;
  rowIndex: number;
  colIndex: number;
  numRows: number;
}

export const StandardTableCell = React.memo(function StandardTableCell<TItem>({
  columnId,
  item,
  colIndex,
  rowIndex,
  numRows
}: StandardTableCellProps<TItem>) {
  const {
    config: { columnOrder, tableId, enableGridCell }
  } = useStandardTableContext();

  const {
    itemValueResolver,
    itemLabelFormatter,
    flex = 1,
    width,
    justifyContentCell = "flex-start",
    borderLeft,
    renderCell,
    gridCellOptions,
    isEditable,
    onChange,
    disableGridCell
  } = useColumnFromConfig(columnId);

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
        ? itemLabelFormatter(itemValue)
        : formatValueLabel(itemValue),
    [itemValue, itemLabelFormatter]
  );

  const gridCell = useGridCellMemo<string>(label, {
    colIndex,
    rowIndex,
    numRows,
    numCols: columnOrder.length,
    tableId,
    isEditable:
      typeof isEditable === "boolean"
        ? isEditable
        : isEditable
        ? isEditable(item)
        : undefined,
    onChange: onChange
      ? (value: string | undefined) => onChange(item, value)
      : undefined,
    ...gridCellOptions
  });

  const currentBackground = useCellBackgroundByColumnId(columnId, item);

  const content = useMemo(
    () =>
      renderCell ? (
        renderCell(label, itemValue, item, gridCell)
      ) : (
        <TextCell label={label} />
      ),
    [label, itemValue, item, gridCell, renderCell]
  );

  return (
    <StandardTableCellUi
      enableGridCell={enableGridCell && !disableGridCell}
      gridCellRequiredProps={gridCell.requiredProps}
      isEditing={gridCell.isEditing}
      width={width}
      justifyContent={justifyContentCell}
      borderLeft={borderLeft}
      flex={flex}
      background={currentBackground}
    >
      {content}
    </StandardTableCellUi>
  );
});
