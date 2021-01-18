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
  disableBorderLeft?: boolean;
}

export const StandardTableCell = React.memo(function StandardTableCell<TItem>({
  columnId,
  item,
  colIndex,
  rowIndex,
  numRows,
  disableBorderLeft,
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
    minWidth,
    justifyContentCell = "flex-start",
    borderLeft,
    renderCell,
    gridCellOptions: gridCellOptionsForColumn,
    isEditable,
    onChange,
    disableGridCell,
    sticky,
    zIndex,
    left,
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

  const gridCell = useGridCell<string>(label, {
    colIndex,
    rowIndex,
    numRows,
    numCols: columnOrder?.length ?? 0 + (showRowCheckbox ? 1 : 0),
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
      minWidth={minWidth}
      justifyContent={justifyContentCell}
      borderLeft={disableBorderLeft ? undefined : borderLeft}
      flex={flex}
      background={currentBackground}
      sticky={sticky}
      zIndex={zIndex}
      left={left}
      shadow={sticky ? "var(--swui-sticky-column-shadow-right)" : undefined}
    >
      {content}
    </StandardTableCellUi>
  );
});
