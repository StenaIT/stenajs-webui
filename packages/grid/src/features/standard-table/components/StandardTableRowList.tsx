import * as React from "react";
import { useMemo, useRef } from "react";
import { multitypeComparator } from "../features/sorting/MultitypeComparator";
import { useColumnValueResolver } from "../hooks/UseColumnValueResolver";
import {
  useStandardTableConfig,
  useStandardTableState,
} from "../hooks/UseStandardTableConfig";
import { StandardTableVariant } from "./StandardTable";
import { StandardTableRow } from "./StandardTableRow";

interface StandardTableContentProps<TItem> {
  items?: Array<TItem>;
  colIndexOffset?: number;
  rowIndexOffset?: number;
  variant: StandardTableVariant;
}

export const StandardTableRowList = React.memo(function StandardTableRowList<
  TItem
>({
  items,
  colIndexOffset = 0,
  rowIndexOffset = 0,
}: StandardTableContentProps<TItem>) {
  /**
   * This ref is used to force rerender of rows.
   * This is needed because intersection observer API doesn't correctly trigger for all
   * rows after sorting.
   */
  const sortCounterRef = useRef(0);
  const { keyResolver, disableInfiniteList } = useStandardTableConfig();
  const {
    sortOrder: { sortBy, desc },
  } = useStandardTableState();

  const valueResolver = useColumnValueResolver(sortBy);

  const sortedItems = useMemo(() => {
    if (!items || !items.length) {
      return [];
    }
    if (!valueResolver) {
      return items;
    }

    const sortedList = [...items];
    sortedList.sort((a, b) =>
      multitypeComparator(valueResolver(a) as any, valueResolver(b) as any)
    );
    if (desc) {
      sortedList.reverse();
    }
    sortCounterRef.current++;
    return sortedList;
  }, [items, valueResolver, desc]);

  return (
    <React.Fragment key={sortCounterRef.current}>
      {sortedItems.map((item, index) => (
        <StandardTableRow
          alwaysVisible={disableInfiniteList || sortedItems.length < 30}
          item={item}
          key={keyResolver(item)}
          colIndexOffset={colIndexOffset}
          rowIndex={index + rowIndexOffset}
          numRows={sortedItems.length}
        />
      ))}
    </React.Fragment>
  );
});
