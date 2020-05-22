import { StandardTableColumnConfig } from "../config/StandardTableConfig";
import { useStandardTableConfig } from "./UseStandardTableConfig";

export const useColumnFromConfig = <TItem, TItemValue = any>(
  columnId: string
): StandardTableColumnConfig<TItem, TItemValue> => {
  const { columns } = useStandardTableConfig();
  const column = columns[columnId];
  if (!column) {
    throw new Error("No config for column with id=" + columnId);
  }
  return column;
};

export const useColumnFromConfigByIndex = (columnIndex: number) => {
  const { columnOrder } = useStandardTableConfig();
  if (columnIndex >= columnOrder.length) {
    throw new Error("Column index is larger than number of columns.");
  }
  if (columnIndex < 0) {
    throw new Error("Column index cannot be negative.");
  }
  const columnId = columnOrder[columnIndex];

  return useColumnFromConfig(columnId);
};

export const useFirstColumnFromConfig = () => {
  return useColumnFromConfigByIndex(0);
};

export const useLastColumnFromConfig = () => {
  const { columnOrder } = useStandardTableConfig();

  return useColumnFromConfigByIndex(columnOrder.length - 1);
};
