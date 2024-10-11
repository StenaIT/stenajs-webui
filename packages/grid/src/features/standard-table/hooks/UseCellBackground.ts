import { useMemo } from "react";
import {
  BackgroundResolver,
  StandardTableColumnConfig,
} from "../config/StandardTableColumnConfig";
import { useColumnConfigById } from "./UseColumnConfigById";

const getBackgroundColor = <TItem>(
  backgroundResolver: BackgroundResolver<TItem> | undefined,
  item: TItem,
  background: string | undefined,
): string | undefined =>
  backgroundResolver ? backgroundResolver(item) : background;

const useBackground = <TItem>(
  backgroundResolver: BackgroundResolver<TItem> | undefined,
  item: TItem,
  background: string | undefined,
): string | undefined =>
  useMemo(
    () => getBackgroundColor(backgroundResolver, item, background),
    [backgroundResolver, item, background],
  );

export const useCellBackgroundByColumnId = <T>(
  columnId: string,
  item: T,
): string | undefined => {
  const { background, backgroundResolver } = useColumnConfigById(columnId);
  return useBackground(backgroundResolver, item, background);
};

export const useCellBackgroundByColumnConfig = <
  TItem,
  TItemValue,
  TColumnKey extends string,
>(
  columnConfig:
    | StandardTableColumnConfig<TItem, TItemValue, TColumnKey>
    | undefined,
  item: TItem,
): string | undefined => {
  const { background, backgroundResolver } = columnConfig ?? {};
  return useBackground(backgroundResolver, item, background);
};
