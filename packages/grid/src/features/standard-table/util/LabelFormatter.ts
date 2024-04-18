import lowerCase from "lodash/lowerCase";
import upperFirst from "lodash/upperFirst";

export const formatValueLabel = <T>(itemValue: T) => {
  if (itemValue == null) {
    return "";
  } else if (itemValue instanceof Date) {
    return itemValue.toISOString();
  } else if (typeof itemValue === "object") {
    return JSON.stringify(itemValue);
  } else {
    return String(itemValue);
  }
};

export const formatColumnIdToHeaderCellLabel = (columnId: string): string =>
  upperFirst(lowerCase(columnId));
