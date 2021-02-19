export type CustomCellFormatters<TItem, TColumnKey extends string> = Partial<
  Record<TColumnKey, CustomCellFormatter<TItem>>
>;

export type CustomCellFormatter<TItem> = (item: TItem) => string | number;
