import { cssColor } from "@stenajs-webui/theme";
import { isAfter, isBefore, isSameDay } from "date-fns";

const rangeBgColor = cssColor("--lhds-color-red-100");

export const getCellBackgroundColors = (
  date: Date,
  selectedStartDate: Date | undefined,
  selectedEndDate: Date | undefined,
  hoverDate: Date | undefined,
  dayIsInMonth: boolean,
  isValidDateRange: boolean
): { left: string; right: string } => {
  if (!dayIsInMonth) {
    return {
      left: "transparent",
      right: "transparent",
    };
  }

  if (
    selectedStartDate &&
    selectedEndDate &&
    isSameDay(selectedStartDate, selectedEndDate)
  ) {
    return {
      left: "transparent",
      right: "transparent",
    };
  }

  if (selectedStartDate && selectedEndDate && !isValidDateRange) {
    return {
      left: "transparent",
      right: "transparent",
    };
  }

  const isInSelectionRange =
    selectedStartDate && selectedEndDate
      ? isAfter(date, selectedStartDate) &&
        isBefore(date, selectedEndDate) &&
        !isSameDay(date, selectedStartDate) &&
        !isSameDay(date, selectedEndDate)
      : false;

  const isInHoverRange =
    selectedStartDate && hoverDate
      ? isAfter(date, selectedStartDate) &&
        isBefore(date, hoverDate) &&
        !isSameDay(date, selectedStartDate) &&
        !isSameDay(date, hoverDate)
      : false;

  if (isInSelectionRange) {
    return {
      left: rangeBgColor,
      right: rangeBgColor,
    };
  }

  if (selectedStartDate && selectedEndDate) {
    if (isSameDay(date, selectedStartDate)) {
      return {
        left: "transparent",
        right: rangeBgColor,
      };
    }

    if (isSameDay(date, selectedEndDate)) {
      return {
        left: rangeBgColor,
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
        right: rangeBgColor,
      };
    }

    if (isSameDay(date, hoverDate)) {
      return {
        left: rangeBgColor,
        right: "transparent",
      };
    }
  }

  if (isInHoverRange) {
    return {
      left: rangeBgColor,
      right: rangeBgColor,
    };
  }

  return {
    left: "transparent",
    right: "transparent",
  };
};
