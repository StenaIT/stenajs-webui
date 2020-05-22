import { ReactNode } from "react";
import {
  UseGridCellOptions,
  UseGridCellResult
} from "../../grid-cell/hooks/UseGridCell";

export interface StandardTableConfig<TItem, TColumnKeys extends string> {
  /**
   * Configs for the columns available in the table.
   */
  columns: Record<TColumnKeys, StandardTableColumnConfig<TItem, any>>;
  /**
   * The order of the columns. This is a list of keys from `columns`.
   * If a column is not added, it is not displayed.
   */
  columnOrder: Array<TColumnKeys>;
  /**
   * A key resolver for an item in the list. This is needed for React key props in the components.
   * @param item
   */
  keyResolver: (item: TItem) => string;
  /**
   * Add this to create a background color for the row, based on the item displayed.
   * @param item
   */
  rowBackgroundResolver?: (item: TItem) => string | undefined;
  /**
   * This makes it possible to disable the checkbox for a row, based in the item.
   * @param item
   */
  checkboxDisabledResolver?: (item: TItem) => boolean;
  /**
   * Enable or disables the useGridCell hooks. The hook is always running, but this controls
   * if it is applied to the DOM or not.
   */
  enableGridCell?: boolean;
  /**
   * Shows a checkbox in the header. The checkbox state is a function of the item checkboxes
   * and cannot be controlled.
   */
  showHeaderCheckbox?: boolean;
  /**
   * Shows a checkbox on the left side of each row. The state is controller by the tableContext.
   */
  showRowCheckbox?: boolean;
  /**
   * Add indent to the row itself.
   */
  rowIndent?: boolean | number;
}

export type StandardTableColumnConfig<
  TItem,
  TItemValue
> = StandardTableColumnOptions<TItem, TItemValue> &
  ItemValueResolver<TItem, TItemValue>;

export type StandardTableCellRenderer<TItemValue, TItem> = (
  label: string,
  value: TItemValue,
  item: TItem,
  gridCell: UseGridCellResult<string>,
  isEditable?: boolean
) => ReactNode;

export interface StandardTableColumnOptions<TItem, TItemValue> {
  /**
   * The header label of the column.
   */
  columnLabel?: string;
  /**
   * This shows a tooltip on the left side of the column header label.
   */
  infoIconTooltipText?: string;
  /**
   * The width of the column.
   */
  width?: string;
  /**
   * The flex of the column. Defaults to 1 if width is not specified.
   */
  flex?: number;
  /**
   * Custom renderer for the cell. Falls back to an internal renderer that uses String(item[field]).
   */
  renderCell?: StandardTableCellRenderer<TItemValue, TItem>;
  /**
   * Adds a static background color to the column.
   */
  background?: string;
  /**
   * Adds a dynamic background color to the column, based on the item.
   */
  backgroundResolver?: (item: TItem) => string | undefined;
  /**
   * Adds a border on the left side of the column. Can be a boolean, is a border CSS value.
   */
  borderLeft?: string | boolean;
  /**
   * Justify content for the header. Defaults to flex-start, which aligns the label to the left.
   */
  justifyContentHeader?: string;
  /**
   * Justify content for the cell. Defaults to flex-start, which aligns the cell content to the left.
   */
  justifyContentCell?: string;
  /**
   * A custom label formatter. This is applied after sorting, and before renderCell.
   * Useful for formatting dates for example.
   * @param value
   */
  itemLabelFormatter?: (value: TItemValue) => string;
  /**
   * Specifies if the cell is editable. Used together with gridCellEnabled.
   * Defaults to false. Can be a boolean or a resolver.
   */
  isEditable?: boolean | ((item: TItem) => boolean);
  /**
   * The onChange callback when isEditable is true.
   * @param item
   * @param value
   */
  onChange?: (item: TItem, value: string | undefined) => void;
  /**
   * Disables the grid cell functionality for this column.
   */
  disableGridCell?: boolean;
  /**
   * Grid cell options, if you need custom behaviour.
   * Not all options are available, since it is controlled by StandardTable.
   */
  gridCellOptions?: Omit<
    UseGridCellOptions<string>,
    | "colIndex"
    | "rowIndex"
    | "numRows"
    | "numCols"
    | "tableId"
    | "isEditable"
    | "onChange"
  >;
}

interface ItemValueResolver<TItem, TItemValue> {
  itemValueResolver: (item: TItem) => TItemValue;
}

export const createColumnConfig = <TItem, TItemValue>(
  itemValueResolver: (item: TItem) => TItemValue,
  options?: StandardTableColumnOptions<TItem, TItemValue>
): StandardTableColumnConfig<TItem, TItemValue> => {
  return {
    ...options,
    itemValueResolver
  };
};
