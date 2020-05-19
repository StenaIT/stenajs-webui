import { useStandardTableContext } from "./UseStandardTableContext";

export const useColumnValueResolver = (columnId: string | undefined) => {
  const {
    config: { columns }
  } = useStandardTableContext();
  if (!columnId) {
    return undefined;
  }
  const column = columns[columnId];
  if (!column) {
    return undefined;
  }
  return column.itemValueResolver;
};
