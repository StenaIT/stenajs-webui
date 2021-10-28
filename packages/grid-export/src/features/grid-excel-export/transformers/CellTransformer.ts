import { StandardTableColumnConfig } from "@stenajs-webui/grid";
import { format } from "date-fns";
import { ZipCelXCell } from "zipcelx";
import { CustomCellFormatter } from "../../../common/CellFormatters";

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
  itemLabelFormatter:
    | StandardTableColumnConfig<
        TItem,
        TItemValue,
        TColumnKey
      >["itemLabelFormatter"]
    | undefined,
  formatter?: CustomCellFormatter<TItem>
): ZipCelXCell => {
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

const createCell = (value: string | number): ZipCelXCell => {
  const type = typeof value === "number" ? "number" : "string";
  return {
    type,
    value,
  };
};
