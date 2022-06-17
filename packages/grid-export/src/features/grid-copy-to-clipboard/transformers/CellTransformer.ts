import { StandardTableColumnConfig } from "@stenajs-webui/grid";
import { format } from "date-fns";
import { CustomCellFormatter } from "../../../common/CellFormatters";
import { transformJustifyContentToTextAlign } from "./AlignmentTransformer";

export const transformItemToCell = <
  TItem,
  TItemValue,
  TColumnKey extends string
>(
  item: TItem,
  itemValueResolver: StandardTableColumnConfig<
    TItem,
    TItemValue,
    TColumnKey
  >["itemValueResolver"],
  justifyContentCell: StandardTableColumnConfig<
    TItem,
    TItemValue,
    TColumnKey
  >["justifyContentCell"],
  itemLabelFormatter:
    | StandardTableColumnConfig<
        TItem,
        TItemValue,
        TColumnKey
      >["itemLabelFormatter"]
    | undefined,
  formatter?: CustomCellFormatter<TItem>
): string => {
  if (formatter) {
    return createCell(formatter(item), justifyContentCell);
  }

  const value = itemValueResolver(item);

  if (itemLabelFormatter) {
    const label = itemLabelFormatter?.(value, item);
    return createCell(label, justifyContentCell);
  }

  if (typeof value === "number" || typeof value === "string") {
    return createCell(value, justifyContentCell);
  }

  if (typeof value === "boolean") {
    return createCell(value ? "Y" : "", justifyContentCell);
  }

  if (value instanceof Date) {
    return createCell(format(value, "yyyy-MM-dd HH:mm"), justifyContentCell);
  }

  if (value == null) {
    return createCell("", justifyContentCell);
  }

  return createCell(String(value), justifyContentCell);
};

const createCell = (
  value: string | number,
  justifyContentCell: string | undefined
): string => {
  if (justifyContentCell) {
    const styleProperty = transformJustifyContentToTextAlign(
      justifyContentCell
    );
    return `<td${
      styleProperty ? ' style="' + styleProperty + '"' : ""
    }>${value}</td>`;
  }
  return `<td>${value}</td>`;
};
