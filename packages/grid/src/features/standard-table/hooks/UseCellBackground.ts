import { useMemo } from "react";
import { StandardTableColumnConfig } from "../config/StandardTableConfig";
import { useColumnFromConfig } from "./UseColumnFromConfig";

const useBackground = <TItem>(
  backgroundResolver: ((item: TItem) => string | undefined) | undefined,
  item: TItem,
  background: string | undefined
) =>
  useMemo(() => (backgroundResolver ? backgroundResolver(item) : background), [
    backgroundResolver,
    item,
    background
  ]);

export const useCellBackgroundByColumnId = <T>(columnId: string, item: T) => {
  const { background, backgroundResolver } = useColumnFromConfig(columnId);
  return useBackground(backgroundResolver, item, background);
};

export const useCellBackgroundByColumnConfig = <TItem>(
  columnConfig: StandardTableColumnConfig<TItem, {}>,
  item: TItem
) => {
  const { background, backgroundResolver } = columnConfig;
  return useBackground(backgroundResolver, item, background);
};
