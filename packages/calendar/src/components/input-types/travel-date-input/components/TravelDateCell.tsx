import * as React from "react";
import { KeyboardEventHandler, useCallback, useMemo } from "react";
import { Box, Row, Text } from "@stenajs-webui/core";
import {
  DayData,
  MonthData,
} from "../../../../util/calendar/CalendarDataFactory";
import { TravelDateInputValue } from "../TravelDateInput";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import styles from "./TravelDateCell.module.css";
import cx from "classnames";
import { isBefore, isSameDay, isSameMonth } from "date-fns";
import { getCellBackgroundColors } from "../util/CellBgColors";
import { TravelDateInput } from "../TravelDateInputTypes";
import { createDayId, getDateToFocusOn } from "../util/KeyboardNavigation";

export interface TravelDateCellProps
  extends ValueAndOnValueChangeProps<TravelDateInputValue> {
  day: DayData;
  visibleMonth: MonthData;
  onChangeVisibleMonth: (visibleMonth: Date) => void;
  onHoverDay: (day: DayData) => void;
  onNoHoverDay: (day: DayData) => void;
  hoverDay: DayData | undefined;
  today: Date;
  inputInFocus: TravelDateInput;
}

export const TravelDateCell: React.FC<TravelDateCellProps> = ({
  visibleMonth,
  onChangeVisibleMonth,
  day,
  value,
  onValueChange,
  onHoverDay,
  onNoHoverDay,
  hoverDay,
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
    [day.date]
  );

  const startDate = useMemo(
    () => (value?.startDate ? new Date(value.startDate) : undefined),
    [value?.startDate]
  );

  const endDate = useMemo(
    () => (value?.endDate ? new Date(value.endDate) : undefined),
    [value?.endDate]
  );

  const hoverDate = useMemo(
    () => (hoverDay ? new Date(hoverDay.dateString) : undefined),
    [hoverDay]
  );

  const onClickDate = () => {
    if (dayIsInMonth) {
      if (startDate && endDate == null) {
        if (isBefore(day.date, startDate)) {
          onValueChangeHandler({
            startDate: day.dateString,
            endDate: undefined,
          });
        } else {
          onValueChangeHandler({
            endDate: day.dateString,
          });
        }
      } else {
        onValueChangeHandler({
          startDate: day.dateString,
          endDate: undefined,
        });
      }
    }
  };

  const onValueChangeHandler = (v: Partial<TravelDateInputValue>) => {
    onValueChange?.({ ...value, ...v });
  };

  const dayIsInMonth = day.month === visibleMonth.monthInYear;
  const isSelectionStart = startDate ? isSameDay(startDate, day.date) : false;
  const isSelectionEnd = endDate ? isSameDay(endDate, day.date) : false;

  const bgColors = getCellBackgroundColors(
    day.date,
    startDate,
    endDate,
    hoverDate,
    dayIsInMonth
  );

  return (
    <td
      className={styles.travelDateCell}
      onClick={onClickDate}
      onMouseOver={() => dayIsInMonth && onHoverDay(day)}
      onMouseOut={() => dayIsInMonth && onNoHoverDay(day)}
      tabIndex={getTabIndex(inputInFocus, day, startDate, endDate, today)}
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
            startDate ? styles.startSelected : undefined,
            endDate ? styles.endSelected : undefined,
            hoverDay?.dateString === day.dateString ? styles.hover : undefined,
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
