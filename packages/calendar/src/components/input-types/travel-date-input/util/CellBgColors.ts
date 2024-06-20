import { cssColor } from "@stenajs-webui/theme";
import { isAfter, isSameDay } from "date-fns";

export const getCellBackgroundColors = (
  date: Date,
  selectedStartDate: Date | undefined,
  selectedEndDate: Date | undefined,
  hoverDate: Date | undefined,
  isInHoverRange: boolean,
  isInSelectionRange: boolean
): { left: string; right: string } => {
  if (isInSelectionRange) {
    return {
      left: cssColor("--lhds-color-red-200"),
      right: cssColor("--lhds-color-red-200"),
    };
  }

  if (selectedStartDate && selectedEndDate) {
    if (isSameDay(date, selectedStartDate)) {
      return {
        left: "transparent",
        right: cssColor("--lhds-color-red-200"),
      };
    }

    if (isSameDay(date, selectedEndDate)) {
      return {
        left: cssColor("--lhds-color-red-200"),
        right: "transparent",
      };
    }

    return {
      left: "transparent",
      right: "transparent",
    };
  }

  if (selectedStartDate && hoverDate && isAfter(hoverDate, selectedStartDate)) {
    if (isSameDay(date, selectedStartDate)) {
      return {
        left: "transparent",
        right: cssColor("--lhds-color-red-200"),
      };
    }

    if (isSameDay(date, hoverDate)) {
      return {
        left: cssColor("--lhds-color-red-200"),
        right: "transparent",
      };
    }
  }

  if (isInHoverRange) {
    return {
      left: cssColor("--lhds-color-red-200"),
      right: cssColor("--lhds-color-red-200"),
    };
  }

  return {
    left: "transparent",
    right: "transparent",
  };
};
