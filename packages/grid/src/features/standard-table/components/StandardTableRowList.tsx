import * as React from "react";
import { useMemo } from "react";
import { InfiniteList } from "../../table-ui/components/InfiniteList";
import { tableRowHeightPixels } from "../../../config/TableConfig";
import { useColumnValueResolver } from "../hooks/UseColumnValueResolver";
import {
  useStandardTableConfig,
  useStandardTableState
} from "../hooks/UseStandardTableConfig";
import { multitypeComparator } from "../util/MultitypeComparator";
import { StandardTableRow } from "./StandardTableRow";

interface StandardTableContentProps<TItem> {
  items?: Array<TItem>;
}

export const StandardTableRowList = React.memo(function StandardTableRowList<
  TItem
>({ items }: StandardTableContentProps<TItem>) {
  const { keyResolver, enableGridCell } = useStandardTableConfig();
  const {
    sortOrder: { sortBy, desc }
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
    return sortedList;
  }, [items, valueResolver, desc]);

  return (
    <InfiniteList
      length={sortedItems.length}
      elementHeight={tableRowHeightPixels}
      threshold={30}
    >
      {sortedItems.map((item, index) => (
        <StandardTableRow
          item={item}
          key={keyResolver(item)}
          rowIndex={enableGridCell ? index : 0}
          numRows={enableGridCell ? sortedItems.length : 0}
        />
      ))}
    </InfiniteList>
  );
});
