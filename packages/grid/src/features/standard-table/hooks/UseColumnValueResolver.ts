import { useStandardTableConfig } from "./UseStandardTableConfig";

export const useColumnValueResolver = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string = string
>(
  columnId: TColumnKey | undefined
) => {
  const { columns } = useStandardTableConfig<
    TItem,
    TColumnKey,
    TColumnGroupKey
  >();
  if (!columnId) {
    return undefined;
  }
  const column = columns[columnId];
  if (!column) {
    return undefined;
  }
  return column.itemValueResolver;
};
