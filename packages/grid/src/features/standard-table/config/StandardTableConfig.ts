import { ReactNode } from "react";
import {
  UseGridCellOptions,
  UseGridCellResult
} from "../../grid-cell/hooks/UseGridCell";

export interface StandardTableConfig<TItem, TColumnKeys extends string> {
  columns: Record<TColumnKeys, StandardTableColumnConfig<TItem, any>>;
  columnOrder: Array<TColumnKeys>;
  keyResolver: (item: TItem) => string;
  rowBackgroundResolver?: (item: TItem) => string | undefined;
  checkboxDisabledResolver?: (item: TItem) => boolean;
  tableId: string;
  enableGridCell?: boolean;
  showHeaderCheckbox?: boolean;
  showRowCheckbox?: boolean;
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
  gridCell: UseGridCellResult<string>
) => ReactNode;

export interface StandardTableColumnOptions<TItem, TItemValue> {
  columnLabel?: string;
  infoIconTooltipText?: string;
  width?: string;
  flex?: number;
  renderCell?: StandardTableCellRenderer<TItemValue, TItem>;
  background?: string;
  backgroundResolver?: (item: TItem) => string | undefined;
  borderLeft?: string | boolean;
  justifyContentHeader?: string;
  justifyContentCell?: string;
  itemLabelFormatter?: (value: TItemValue) => string;
  isEditable?: boolean | ((item: TItem) => boolean);
  onChange?: (item: TItem, value: string | undefined) => void;
  disableGridCell?: boolean;
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
