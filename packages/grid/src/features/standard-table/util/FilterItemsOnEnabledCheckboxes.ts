export type ItemFilterFunc<TItem> = (item: TItem) => boolean;

export const filterItemsOnEnabledCheckboxes =
  <TItem>(
    checkboxDisabledResolver?: (item: TItem) => boolean
  ): ItemFilterFunc<TItem> =>
  (item: TItem) =>
    checkboxDisabledResolver?.(item) ? false : true ?? true;
