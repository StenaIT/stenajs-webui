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
  colIndexOffset?: number;
  rowIndexOffset?: number;
}

export const StandardTableRowList = React.memo(function StandardTableRowList<
  TItem
>({
  items,
  colIndexOffset = 0,
  rowIndexOffset = 0
}: StandardTableContentProps<TItem>) {
  const {
    keyResolver,
    disableInfiniteList,
    enableExpandCollapse
  } = useStandardTableConfig();
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
      disabled={disableInfiniteList || enableExpandCollapse}
      length={sortedItems.length}
      elementHeight={tableRowHeightPixels}
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
