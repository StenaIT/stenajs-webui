import * as React from "react";
import { useEffect, useMemo, useRef } from "react";
import {
  ComparableType,
  multitypeComparator,
} from "../features/sorting/MultitypeComparator";
import { useColumnValueResolver } from "../hooks/UseColumnValueResolver";
import {
  useStandardTableConfig,
  useStandardTableState,
} from "../hooks/UseStandardTableConfig";
import { StandardTableVariant } from "./StandardTable";
import { StandardTableRow } from "./StandardTableRow";
import { SummaryRowSwitcher } from "../features/summary-row/components/SummaryRowSwitcher";
import { filterItemsOnEnabledCheckboxes } from "../util/FilterItemsOnEnabledCheckboxes";

interface StandardTableContentProps<TItem extends object> {
  items?: Array<TItem>;
  colIndexOffset?: number;
  rowIndexOffset?: number;
  variant: StandardTableVariant;
}

export const StandardTableRowList = React.memo(function StandardTableRowList<
  TItem extends object
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

  const shiftPressedRef = useRef(false);

  const {
    keyResolver,
    disableInfiniteList,
    checkboxDisabledResolver,
    enableExternalSorting,
  } = useStandardTableConfig();
  const {
    sortOrder: { sortBy, desc },
  } = useStandardTableState();

  const valueResolver = useColumnValueResolver(sortBy);

  const sortedItems = useMemo(() => {
    if (enableExternalSorting) {
      return items ?? [];
    }
    if (!items || !items.length) {
      return [];
    }
    if (!valueResolver) {
      return items;
    }

    const sortedList = [...items];
    sortedList.sort((a, b) =>
      multitypeComparator(
        valueResolver(a) as ComparableType,
        valueResolver(b) as ComparableType
      )
    );
    if (desc) {
      sortedList.reverse();
    }
    if (!disableInfiniteList) {
      sortCounterRef.current++;
    }
    return sortedList;
  }, [enableExternalSorting, items, valueResolver, desc, disableInfiniteList]);

  const idListForEnabledItems = useMemo(
    () =>
      sortedItems
        .filter(filterItemsOnEnabledCheckboxes(checkboxDisabledResolver))
        .map((l) => keyResolver(l)),
    [sortedItems, checkboxDisabledResolver, keyResolver]
  );

  useEffect(() => {
    const keyUp = (ev: KeyboardEvent) => {
      if (ev.key === "Shift") {
        shiftPressedRef.current = false;
      }
    };

    const keyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Shift") {
        shiftPressedRef.current = true;
      }
    };

    document.addEventListener("keyup", keyUp);
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keyup", keyUp);
      document.removeEventListener("keydown", keyDown);
    };
  }, []);

  return (
    <React.Fragment key={sortCounterRef.current}>
      {sortedItems.map((item, index) => (
        <StandardTableRow
          alwaysVisible={disableInfiniteList || sortedItems.length < 30}
          item={item}
          idListForEnabledItems={idListForEnabledItems}
          key={keyResolver(item)}
          colIndexOffset={colIndexOffset}
          rowIndex={index + rowIndexOffset}
          numRows={sortedItems.length}
          shiftPressedRef={shiftPressedRef}
        />
      ))}
      <SummaryRowSwitcher items={sortedItems} />
    </React.Fragment>
  );
});
