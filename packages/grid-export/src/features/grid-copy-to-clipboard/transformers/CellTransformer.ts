import { StandardTableColumnConfig } from "@stenajs-webui/grid";
import { format } from "date-fns";
import { CustomCellFormatter } from "./ConfigTransformer";

export const transformItemToCell = <TItem, TItemValue>(
  item: TItem,
  itemValueResolver: StandardTableColumnConfig<
    TItem,
    TItemValue
  >["itemValueResolver"],
  itemLabelFormatter:
    | StandardTableColumnConfig<TItem, TItemValue>["itemLabelFormatter"]
    | undefined,
  formatter?: CustomCellFormatter<TItem>
): string => {
  if (formatter) {
    return createCell(formatter(item));
  }

  const value = itemValueResolver(item);

  if (itemLabelFormatter) {
    const label = itemLabelFormatter?.(value, item);
    return createCell(label);
  }

  if (typeof value === "number" || typeof value === "string") {
    return createCell(value);
  }

  if (typeof value === "boolean") {
    return createCell(value ? "Y" : "");
  }

  if (value instanceof Date) {
    return createCell(format(value, "yyyy-MM-dd HH:mm"));
  }

  if (value == null) {
    return createCell("");
  }

  return createCell(String(value));
};

const createCell = (value: string | number): string => {
  return `<td>${value}</td>`;
};
