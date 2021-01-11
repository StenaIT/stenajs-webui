import { useMemo } from "react";
import {
  BackgroundResolver,
  StandardTableColumnConfig,
} from "../config/StandardTableConfig";
import { useColumnFromConfig } from "./UseColumnFromConfig";

const getBackgroundColor = <TItem>(
  backgroundResolver: BackgroundResolver<TItem> | undefined,
  item: TItem,
  background: string | undefined
) => (backgroundResolver ? backgroundResolver(item) : background) ?? "inherit";

const useBackground = <TItem>(
  backgroundResolver: BackgroundResolver<TItem> | undefined,
  item: TItem,
  background: string | undefined
) =>
  useMemo(() => getBackgroundColor(backgroundResolver, item, background), [
    backgroundResolver,
    item,
    background,
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
