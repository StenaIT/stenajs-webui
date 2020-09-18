import { useMemo } from "react";
import { EntityWithId } from "../../../../common/EntityWithId";
import { SortOrderByIdState } from "../sort-order-by-id-reducer";

export const useSortOrderById = <TItem extends EntityWithId>(
  list: Array<TItem> | undefined,
  sortOrderByIdState: SortOrderByIdState
): Array<TItem> =>
  useMemo(() => {
    if (!list) {
      return [];
    }
    if (!sortOrderByIdState.ids || !sortOrderByIdState.ids.length) {
      return list;
    }
    if (list.length !== sortOrderByIdState.ids.length) {
      console.warn("Sort order size does not equal list size. Disabling sort.");
      return list;
    }

    return sortOrderByIdState.ids.map((id) => {
      const item = list.find((l) => l.id === id);
      if (!item) {
        throw new Error(
          "Trying to order list, but id was not found in data set."
        );
      }
      return item;
    });
  }, [list, sortOrderByIdState]);
