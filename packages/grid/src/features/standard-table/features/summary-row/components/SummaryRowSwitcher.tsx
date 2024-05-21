import * as React from "react";
import { useMemo } from "react";
import { isSummaryRowVisible } from "../SummaryRowVisibilityCalculator";
import { useStandardTableConfig } from "../../../hooks/UseStandardTableConfig";
import { StandardTableSummaryRow } from "./StandardTableSummaryRow";

interface SummaryRowSwitcherProps<TItem extends {}> {
  items: Array<TItem>;
}

export const SummaryRowSwitcher = function SummaryRowSwitcher<
  TItem extends {}
>({ items }: SummaryRowSwitcherProps<TItem>) {
  const { columns } = useStandardTableConfig();
  const visible = useMemo(() => isSummaryRowVisible(columns), [columns]);

  if (!visible) {
    return null;
  }

  return <StandardTableSummaryRow items={items} />;
};
