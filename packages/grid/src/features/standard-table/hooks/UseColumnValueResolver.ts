import { useStandardTableConfig } from "./UseStandardTableConfig";

export const useColumnValueResolver = (columnId: string | undefined) => {
  const { columns } = useStandardTableConfig();
  if (!columnId) {
    return undefined;
  }
  const column = columns[columnId];
  if (!column) {
    return undefined;
  }
  return column.itemValueResolver;
};
