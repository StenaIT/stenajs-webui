import { ReactNode } from "react";
import { UseGridCellOptions } from "../../grid-cell/hooks/UseGridCell";
import { SortOrderIconVariant } from "../../table-ui/components/table/SortOrderIcon";
import {
  DefaultStandardTableCellRenderer,
  StandardTableColumnConfig,
  StandardTableColumnConfigWithGroups,
} from "./StandardTableColumnConfig";
import { StandardTableColumnGroupConfig } from "./StandardTableColumnGroupConfig";
import { TextSize } from "@stenajs-webui/core";

export interface RowExpansionArgs {
  onRequestCollapse?: () => void;
}

export interface StandardTableOnKeyDownArgs<TItem, TColumnKey extends string> {
  columnId: TColumnKey;
  item: TItem;
}

export type StandardTableConfig<
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string = string
> =
  | StandardTableConfigWithGroups<TItem, TColumnKey, TColumnGroupKey>
  | StandardTableConfigWithNoGroups<TItem, TColumnKey>;

export interface StandardTableConfigWithGroups<
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string = string
> extends StandardTableConfigBase<TItem, TColumnKey> {
  /**
   * Configs for the columns available in the table.
   */
  columns: Record<
    TColumnKey,
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    StandardTableColumnConfigWithGroups<TItem, any, TColumnKey>
  >;

  /**
   * Configs for the column groups available in the table.
   * If column groups are used, columnOrder will not be used.
   */
  columnGroups: Record<
    TColumnGroupKey,
    StandardTableColumnGroupConfig<TColumnKey>
  >;

  /**
   * The order of the column groups. This is a list of keys from `columnGroups`.
   * If the columnGroups `columnOrder` array is empty, it is not displayed.
   */
  columnGroupOrder: Array<TColumnGroupKey>;

  /**
   * Enable sticky behaviour for column groups.
   */
  stickyColumnGroups?: StickyColumnGroupVariant;
}

export interface StandardTableConfigWithNoGroups<
  TItem,
  TColumnKey extends string
> extends StandardTableConfigBase<TItem, TColumnKey> {
  /**
   * Configs for the columns available in the table.
   */
  columns: Record<
    TColumnKey,
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    StandardTableColumnConfig<TItem, any, TColumnKey>
  >;

  /**
   * The order of the columns. This is a list of keys from `columns`.
   * If a column is not added, it is not displayed.
   */
  columnOrder: Array<TColumnKey>;
}

export interface StandardTableConfigBase<TItem, TColumnKey extends string> {
  /**
   * If true, click on table headers does not change sort order.
   */
  disableSorting?: boolean;

  /**
   * If true, click on table headers works as usual, but no sorting is applied.
   * Sort must be applied outside of StandardTable, in client or in backend.
   */
  enableExternalSorting?: boolean;

  /**
   * Table will be sorted by specified column key as default.
   * Only used when using internal reducer. If redux is used, this setting is ignored.
   */
  initialSortOrder?: TColumnKey;

  /**
   * Initial sorting will be desc. Does nothing if initialSortOrder is not specified.
   * Only used when using internal reducer. If redux is used, this setting is ignored.
   */
  initialSortOrderDesc?: boolean;

  /**
   * A key resolver for an item in the list. This is needed for React key props in the components.
   * @param item
   */
  keyResolver: (item: TItem) => string;

  /**
   * Shows an expand collapse button in the header.
   */
  showHeaderExpandCollapse?: boolean;

  /**
   * When enabled, a column is added to the left side for a button.
   * The button visibility is controlled by `expandCollapseDisableResolver`.
   */
  enableExpandCollapse?: boolean;

  /**
   * If specified, return true to remove the expand collapse button from a row.
   * Only applies if `enableExpandCollapse` is true. Default is visible.
   * @param item
   */
  expandCollapseDisableResolver?: (item: TItem) => boolean;

  /**
   * Provide a custom renderer for a row. If undefined, or returns undefined, nothing will
   * happen when the user tries to expand the row.
   * @param item
   */
  renderRowExpansion?: (
    item: TItem,
    args: RowExpansionArgs
  ) => ReactNode | undefined;

  /**
   * Disables react-infinite, which only renders visible rows.
   * This is usable when using expandable rows, since infinite list requires
   * fixed height.
   */
  disableInfiniteList?: boolean;

  /**
   * Add this to create a background color for the row, based on the item displayed.
   * @param item
   */
  rowBackgroundResolver?: (
    item: TItem,
    selected: boolean
  ) => string | RowBackgroundResolverColorCombination | undefined;

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
   * Grid cell options, if you need custom behaviour.
   * Not all options are available, since it is controlled by StandardTable.
   * This is applied on all columns, and settings may be overridden by per-column gridCellOptions.
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

  /**
   * Enable sticky behaviour for header row
   */
  stickyHeader?: boolean;

  /**
   * Enable sticky behaviour for header and row checkbox
   */
  stickyCheckboxColumn?: boolean;

  /**
   * Set a custom z index
   */
  zIndex?: number;

  /**
   * Offset header row from top (top css property)
   */
  headerRowOffsetTop?: string;

  /**
   * The default icon variant to use when displaying sort order. Can be overridden per column.
   * @default amount
   */
  sortOrderIconVariant?: SortOrderIconVariant;

  /**
   * This can be used to override default text renderer for the whole table.
   * Column cellRenderer will still override this. Since this is global for the table, and not local to a column,
   * the type of itemValue can not be known. It should use `label` as source of text instead.
   * If omitted, TextCell is used as usual.
   */
  defaultCellRenderer?: DefaultStandardTableCellRenderer<TItem>;

  /**
   * This config specifies the text size to be used by the default TextCell component.
   * If omitted, "normal" is used.
   */
  defaultTextSize?: TextSize;

  additionalHeaderRows?: Array<Partial<Record<TColumnKey, ReactNode>>>;
}

export interface RowBackgroundResolverColorCombination {
  background: string;
  hoverBackground: string;
}

export type StickyColumnGroupVariant = "first" | "last" | "both";
