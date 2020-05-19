import { StandardTableColumnConfig } from "../config/StandardTableConfig";
import { useStandardTableContext } from "./UseStandardTableContext";

export const useColumnFromConfig = <TItem, TItemValue = any>(
  columnId: string
): StandardTableColumnConfig<TItem, TItemValue> => {
  const {
    config: { columns }
  } = useStandardTableContext();
  const column = columns[columnId];
  if (!column) {
    throw new Error("No config for column with id=" + columnId);
  }
  return column;
};

export const useColumnFromConfigByIndex = (columnIndex: number) => {
  const {
    config: { columnOrder }
  } = useStandardTableContext();
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
  const {
    config: { columnOrder }
  } = useStandardTableContext();

  return useColumnFromConfigByIndex(columnOrder.length - 1);
};
