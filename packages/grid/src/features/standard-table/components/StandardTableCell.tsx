import * as React from "react";
import { useMemo } from "react";
import { useCellBackgroundByColumnId } from "../hooks/UseCellBackground";
import { useColumnFromConfig } from "../hooks/UseColumnFromConfig";
import {
  useStandardTableConfig,
  useStandardTableId,
} from "../hooks/UseStandardTableConfig";
import { formatValueLabel } from "../util/LabelFormatter";
import { StandardTableCellUi } from "./StandardTableCellUi";
import { TextCell } from "./TextCell";
import { useGridCell } from "../../grid-cell/hooks/UseGridCell";

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
  numRows,
}: StandardTableCellProps<TItem>) {
  const {
    columnOrder,
    enableGridCell,
    showRowCheckbox,
    gridCellOptions: gridCellOptionsForTable,
  } = useStandardTableConfig();
  const tableId = useStandardTableId();

  const {
    itemValueResolver,
    itemLabelFormatter,
    flex = 1,
    width,
    justifyContentCell = "flex-start",
    borderLeft,
    renderCell,
    gridCellOptions: gridCellOptionsForColumn,
    isEditable,
    onChange,
    disableGridCell,
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

  const editable =
    typeof isEditable === "boolean"
      ? isEditable
      : isEditable
      ? isEditable(item)
      : undefined;

  const gridCell = useGridCell<string>(label, {
    colIndex,
    rowIndex,
    numRows,
    numCols: columnOrder.length + (showRowCheckbox ? 1 : 0),
    tableId,
    isEditable: editable,
    onChange: onChange
      ? (value: string | undefined) => onChange(item, value)
      : undefined,
    ...gridCellOptionsForTable,
    ...gridCellOptionsForColumn,
  });

  const currentBackground = useCellBackgroundByColumnId(columnId, item);

  const content = useMemo(
    () =>
      renderCell ? (
        renderCell(label, itemValue, item, gridCell, editable)
      ) : (
        <TextCell label={label} />
      ),
    [label, itemValue, item, gridCell, renderCell, editable]
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
