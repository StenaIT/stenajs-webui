import * as React from "react";
import { KeyboardEventHandler, useCallback } from "react";
import { Box, Row, Text } from "@stenajs-webui/core";
import {
  DayData,
  MonthData,
} from "../../../../util/calendar/CalendarDataFactory";
import styles from "./TravelDateCell.module.css";
import cx from "classnames";
import { isSameDay, isSameMonth } from "date-fns";
import { getCellBackgroundColors } from "../util/CellBgColors";
import { TravelDateInput } from "../TravelDateInputTypes";
import { createDayId, getDateToFocusOn } from "../util/KeyboardNavigation";

export interface TravelDateCellProps {
  onClick: () => void;
  day: DayData;
  visibleMonth: MonthData;
  selectedStartDate: Date | undefined;
  selectedEndDate: Date | undefined;
  onChangeVisibleMonth: (visibleMonth: Date) => void;
  onStartHover: () => void;
  onEndHover: () => void;
  hoverDate: Date | undefined;
  today: Date;
  inputInFocus: TravelDateInput;
}

export const TravelDateCell: React.FC<TravelDateCellProps> = ({
  onClick,
  visibleMonth,
  onChangeVisibleMonth,
  day,
  selectedStartDate,
  selectedEndDate,
  onStartHover,
  onEndHover,
  hoverDate,
  inputInFocus,
  today,
}) => {
  const onKeyDown = useCallback<KeyboardEventHandler<HTMLTableDataCellElement>>(
    async (e) => {
      const nextDate = getDateToFocusOn(day.date, e.key);
      if (nextDate) {
        if (!isSameMonth(day.date, nextDate)) {
          onChangeVisibleMonth(nextDate);
        }
        document.getElementById(createDayId(nextDate))?.focus();
      }
    },
    [day.date, onChangeVisibleMonth]
  );

  const dayIsInMonth = day.month === visibleMonth.monthInYear;
  const isSelectionStart = selectedStartDate
    ? isSameDay(selectedStartDate, day.date)
    : false;
  const isSelectionEnd = selectedEndDate
    ? isSameDay(selectedEndDate, day.date)
    : false;

  const bgColors = getCellBackgroundColors(
    day.date,
    selectedStartDate,
    selectedEndDate,
    hoverDate,
    dayIsInMonth
  );

  return (
    <td
      className={styles.travelDateCell}
      onClick={onClick}
      onMouseOver={() => dayIsInMonth && onStartHover()}
      onMouseOut={() => dayIsInMonth && onEndHover()}
      tabIndex={getTabIndex(
        inputInFocus,
        day,
        selectedStartDate,
        selectedEndDate,
        today
      )}
      id={day.dateString}
      onKeyDown={onKeyDown}
    >
      <Row>
        <Box height={"48px"} width={"24px"} background={bgColors.left}></Box>
        <Box height={"48px"} width={"24px"} background={bgColors.right}></Box>
      </Row>

      {dayIsInMonth && (
        <div
          className={cx(
            styles.contentWrapper,
            selectedStartDate ? styles.startSelected : undefined,
            selectedEndDate ? styles.endSelected : undefined,
            hoverDate && isSameDay(hoverDate, day.date)
              ? styles.hover
              : undefined,
            isSelectionStart && styles.isSelectionStart,
            isSelectionEnd && styles.isSelectionEnd
          )}
        >
          <Text>{day.dayOfMonth}</Text>
        </div>
      )}
    </td>
  );
};

const getTabIndex = (
  inputInFocus: TravelDateInput,
  day: DayData,
  startDate: Date | undefined,
  endDate: Date | undefined,
  today: Date
): number => {
  /**
   * If date has been selected (for current input), that date should be tabIndex = 0.
   * If no date has been selected, today's date should be tabIndex = 0.
   * All else should be 1.
   */
  if (
    inputInFocus === "startDate" && startDate
      ? isSameDay(day.date, startDate)
      : isSameDay(day.date, today)
  ) {
    return 0;
  }

  if (
    inputInFocus === "endDate" && endDate
      ? isSameDay(day.date, endDate)
      : isSameDay(day.date, today)
  ) {
    return 0;
  }

  return -1;
};
