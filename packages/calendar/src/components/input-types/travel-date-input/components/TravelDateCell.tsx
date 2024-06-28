import * as React from "react";
import { KeyboardEventHandler, useCallback } from "react";
import { Box, Row, Text } from "@stenajs-webui/core";
import { DayData } from "../../../../util/calendar/CalendarDataFactory";
import styles from "./TravelDateCell.module.css";
import cx from "classnames";
import { isSameDay, isSameMonth } from "date-fns";
import { getCellBackgroundColors } from "../util/CellBgColors";
import { createDayId, getDateToFocusOn } from "../util/KeyboardNavigation";

export interface TravelDateCellProps {
  onClick: (date: Date) => void;
  day: DayData;
  visibleMonth: Date;
  selectedStartDate: Date | undefined;
  selectedEndDate: Date | undefined;
  isValidDateRange: boolean;
  onChangeVisibleMonth: (visibleMonth: Date) => void;
  onStartHover: (date: Date) => void;
  onEndHover: (date: Date) => void;
  hoverDate: Date | undefined;
  today: Date;
  todayIsInVisibleMonth: boolean;
}

export const TravelDateCell: React.FC<TravelDateCellProps> = ({
  onClick,
  visibleMonth,
  onChangeVisibleMonth,
  day,
  isValidDateRange,
  selectedStartDate,
  selectedEndDate,
  onStartHover,
  onEndHover,
  hoverDate,
  today,
  todayIsInVisibleMonth,
}) => {
  const onKeyDown = useCallback<KeyboardEventHandler<HTMLTableDataCellElement>>(
    async (e) => {
      const nextDate = getDateToFocusOn(day.date, e.key);
      if (nextDate) {
        onStartHover(nextDate);
        if (!isSameMonth(day.date, nextDate)) {
          onChangeVisibleMonth(nextDate);
        }
        document.getElementById(createDayId(nextDate))?.focus();
      }
      if (e.key === "Enter") {
        onClick(day.date);
      }
    },
    [day.date, onChangeVisibleMonth, onClick, onStartHover]
  );

  const dayIsInMonth = day.month === visibleMonth.getMonth();

  const isSelectionStart = selectedStartDate
    ? isSameDay(selectedStartDate, day.date)
    : false;

  const isSelectionEnd = selectedEndDate
    ? isSameDay(selectedEndDate, day.date)
    : false;

  const isToday = isSameDay(day.date, today);

  const bgColors = getCellBackgroundColors(
    day.date,
    selectedStartDate,
    selectedEndDate,
    hoverDate,
    dayIsInMonth,
    isValidDateRange
  );

  return (
    <td
      className={styles.travelDateCell}
      onClick={() => onClick(day.date)}
      onMouseOver={() => dayIsInMonth && onStartHover(day.date)}
      onMouseOut={() => dayIsInMonth && onEndHover(day.date)}
      tabIndex={getTabIndex(
        day,
        selectedStartDate,
        isToday,
        visibleMonth,
        todayIsInVisibleMonth
      )}
      id={day.dateString}
      onKeyDown={onKeyDown}
      aria-selected={isSelectionStart || isSelectionEnd}
    >
      <div className={styles.outline} />

      <Row>
        <Box height={"48px"} width={"24px"} background={bgColors.left}></Box>
        <Box height={"48px"} width={"24px"} background={bgColors.right}></Box>
      </Row>

      {dayIsInMonth && (
        <div
          className={cx(
            styles.contentWrapper,
            isToday ? styles.isToday : undefined,
            selectedStartDate ? styles.startSelected : undefined,
            selectedEndDate ? styles.endSelected : undefined,
            hoverDate && isSameDay(hoverDate, day.date)
              ? styles.hover
              : undefined,
            isSelectionStart && styles.isSelectionStart,
            isSelectionEnd && styles.isSelectionEnd
          )}
        >
          <Text variant={"bold"}>{day.dayOfMonth}</Text>
        </div>
      )}
    </td>
  );
};

const getTabIndex = (
  day: DayData,
  selectedStartDate: Date | undefined,
  isToday: boolean,
  visibleMonth: Date,
  todayIsInVisibleMonth: boolean
): number => {
  const selectedStartDateIsVisible = selectedStartDate
    ? isSameMonth(selectedStartDate, visibleMonth)
    : false;

  /**
   * If date has been selected that date should be tabIndex = 0.
   * If no date has been selected, today's date should be tabIndex = 0.
   * All else should be 1.
   */
  if (
    selectedStartDate && selectedStartDateIsVisible
      ? isSameDay(day.date, selectedStartDate)
      : isToday
  ) {
    return 0;
  }

  if (
    !selectedStartDateIsVisible &&
    !todayIsInVisibleMonth &&
    day.date.getDate() === 1
  ) {
    return 0;
  }

  return -1;
};
