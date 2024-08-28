import * as React from "react";
import { KeyboardEventHandler, useCallback } from "react";
import { Text } from "@stenajs-webui/core";
import { DayData } from "../../../util/calendar/CalendarDataFactory";
import styles from "./TravelDateCell.module.css";
import cx from "classnames";
import { isSameDay, isSameMonth } from "date-fns";
import { getCellBackgroundColors } from "../util/CellBgColors";
import { getDateToFocusOn } from "../util/KeyboardNavigation";
import { createDayId } from "../util/DayIdGenerator";
import { cssColor } from "@stenajs-webui/theme";
import { TravelCalendarSizeVariant } from "./TravelCalendar";
import { TravelDateCellBackground } from "./TravelDateCellBackground";

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
  calendarId: string;
  isDateDisabled: (date: Date) => boolean;
  dateTestId?: (date: Date) => string | undefined;
  size: TravelCalendarSizeVariant;
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
  calendarId,
  isDateDisabled,
  size,
  dateTestId,
}) => {
  const onKeyDown = useCallback<KeyboardEventHandler<HTMLTableDataCellElement>>(
    async (e) => {
      const nextDate = getDateToFocusOn(day.date, e.key);
      if (nextDate && !isDateDisabled(nextDate)) {
        onStartHover(nextDate);
        if (!isSameMonth(day.date, nextDate)) {
          onChangeVisibleMonth(nextDate);
          setTimeout(() => {
            document.getElementById(createDayId(nextDate, calendarId))?.focus();
          }, 10);
        } else {
          document.getElementById(createDayId(nextDate, calendarId))?.focus();
        }
      }

      if (e.key === "Enter" || e.code === "Space") {
        onClick(day.date);
      }
    },
    [
      calendarId,
      day.date,
      isDateDisabled,
      onChangeVisibleMonth,
      onClick,
      onStartHover,
    ]
  );

  const dayIsInMonth = day.month === visibleMonth.getMonth();

  const disabled = isDateDisabled(day.date);

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
      className={cx(styles.travelDateCell, styles[size])}
      onClick={disabled ? undefined : () => onClick(day.date)}
      onMouseOver={
        disabled ? undefined : () => dayIsInMonth && onStartHover(day.date)
      }
      onMouseOut={
        disabled ? undefined : () => dayIsInMonth && onEndHover(day.date)
      }
      tabIndex={
        disabled
          ? undefined
          : getTabIndex(
              day,
              selectedStartDate,
              isToday,
              visibleMonth,
              todayIsInVisibleMonth
            )
      }
      id={disabled ? undefined : createDayId(day.date, calendarId)}
      onKeyDown={disabled ? undefined : onKeyDown}
      {...(disabled
        ? undefined
        : { "aria-selected": isSelectionStart || isSelectionEnd })}
      data-testid={dateTestId?.(day.date)}
    >
      <div className={styles.outline} />

      <TravelDateCellBackground
        calendarSize={size}
        bgColorLeft={bgColors.left}
        bgColorRight={bgColors.right}
      />

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
            isSelectionEnd && styles.isSelectionEnd,
            disabled && styles.disabled
          )}
        >
          <Text
            variant={"bold"}
            color={disabled ? cssColor("--lhds-color-ui-500") : undefined}
          >
            {day.dayOfMonth}
          </Text>
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
   * All else should be -1.
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
