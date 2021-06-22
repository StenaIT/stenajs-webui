import * as React from "react";
import { useMemo } from "react";
import { InfiniteList } from "../../table-ui/components/InfiniteList";
import { useColumnValueResolver } from "../hooks/UseColumnValueResolver";
import {
  useStandardTableConfig,
  useStandardTableState,
} from "../hooks/UseStandardTableConfig";
import { createMultiTypeComparator } from "../features/sorting/MultiTypeComparator";
import { StandardTableRow } from "./StandardTableRow";
import { elementHeightPerVariant } from "../config/StandardTableInfiniteConfig";
import { StandardTableVariant } from "./StandardTable";

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
  variant,
  colIndexOffset = 0,
  rowIndexOffset = 0,
}: StandardTableContentProps<TItem>) {
  const {
    keyResolver,
    disableInfiniteList,
    enableExpandCollapse,
  } = useStandardTableConfig();
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
    const comparator = createMultiTypeComparator(desc);
    sortedList.sort((a, b) =>
      comparator(valueResolver(a) as any, valueResolver(b) as any)
    );
    return sortedList;
  }, [items, valueResolver, desc]);

  return (
    <InfiniteList
      disabled={disableInfiniteList || enableExpandCollapse}
      length={sortedItems.length}
      elementHeight={elementHeightPerVariant[variant]}
      threshold={30}
    >
      {sortedItems.map((item, index) => (
        <StandardTableRow
          item={item}
          key={keyResolver(item)}
          colIndexOffset={colIndexOffset}
          rowIndex={index + rowIndexOffset}
          numRows={sortedItems.length}
        />
      ))}
    </InfiniteList>
  );
});
