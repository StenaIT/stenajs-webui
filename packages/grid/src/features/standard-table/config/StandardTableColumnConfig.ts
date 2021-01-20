import { ReactNode } from "react";
import {
  UseGridCellOptions,
  UseGridCellResult,
} from "../../grid-cell/hooks/UseGridCell";

export type StandardTableColumnConfig<
  TItem,
  TItemValue
> = StandardTableColumnOptions<TItem, TItemValue> &
  ItemValueResolver<TItem, TItemValue>;

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
   * The min-width of the column.
   */
  minWidth?: string;

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
  backgroundResolver?: BackgroundResolver<TItem>;

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
  itemLabelFormatter?: (value: TItemValue, item: TItem) => string;

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

  /**
   * Enable sticky behaviour to the left
   * make elements scroll in behind this column
   */
  sticky?: boolean;

  /**
   * Set a custom z index
   */
  zIndex?: number;

  /**
   * Offset column from left (ex if we have multiple sticky columns)
   */
  left?: string;
}

export type StandardTableCellRenderer<TItemValue, TItem> = (
  label: string,
  value: TItemValue,
  item: TItem,
  gridCell: UseGridCellResult<string>,
  isEditable?: boolean
) => ReactNode;

export type BackgroundResolver<TItem> = (item: TItem) => string | undefined;

export interface ItemValueResolver<TItem, TItemValue> {
  itemValueResolver: (item: TItem) => TItemValue;
}

export const createColumnConfig = <TItem, TItemValue>(
  itemValueResolver: (item: TItem) => TItemValue,
  options?: StandardTableColumnOptions<TItem, TItemValue>
): StandardTableColumnConfig<TItem, TItemValue> => {
  return {
    ...options,
    itemValueResolver,
  };
};
