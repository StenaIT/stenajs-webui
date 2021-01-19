import { useMemo } from "react";
import {
  BackgroundResolver,
  StandardTableColumnConfig,
} from "../config/StandardTableColumnConfig";
import { useColumnConfigById } from "./UseColumnConfigById";

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
  const { background, backgroundResolver } = useColumnConfigById(columnId);
  return useBackground(backgroundResolver, item, background);
};

export const useCellBackgroundByColumnConfig = <TItem, TItemValue>(
  columnConfig: StandardTableColumnConfig<TItem, TItemValue> | undefined,
  item: TItem
) => {
  const { background, backgroundResolver } = columnConfig || {};
  return useBackground(backgroundResolver, item, background);
};
