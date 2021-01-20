import { tableBorder } from "../../../config/TableConfig";

export const getCellBorder = (
  borderFromGroup: string | boolean | undefined,
  disableBorderLeft: boolean | undefined,
  borderLeft: string | boolean | undefined
): string | undefined => {
  if (borderFromGroup) {
    if (borderFromGroup === true) {
      return tableBorder;
    }
    return borderFromGroup;
  }
  if (disableBorderLeft) {
    return undefined;
  }

  if (!borderLeft) {
    return undefined;
  }
  if (borderLeft === true) {
    return tableBorder;
  }
  return borderLeft;
};

export const getCellBorderFromGroup = (
  groupIndex: number,
  columnIndexInGroup: number,
  groupBorderLeft: string | boolean | undefined
): string | undefined => {
  if (groupIndex === 0 || columnIndexInGroup !== 0) {
    return undefined;
  }
  if (groupBorderLeft) {
    if (groupBorderLeft === true) {
      return tableBorder;
    }
    return groupBorderLeft;
  }
  return undefined;
};
