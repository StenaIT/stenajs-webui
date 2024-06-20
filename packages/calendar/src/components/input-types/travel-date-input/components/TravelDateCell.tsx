import * as React from "react";
import { useMemo } from "react";
import { Box, Row, Text } from "@stenajs-webui/core";
import {
  DayData,
  MonthData,
} from "../../../../util/calendar/CalendarDataFactory";
import { TravelDateInputValue } from "../TravelDateInput";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import styles from "./TravelDateCell.module.css";
import cx from "classnames";
import { isAfter, isBefore, isSameDay } from "date-fns";
import { getCellBackgroundColors } from "../util/CellBgColors";

export interface TravelDateCellProps
  extends ValueAndOnValueChangeProps<TravelDateInputValue> {
  day: DayData;
  visibleMonth: MonthData;
  onHoverDay: (day: DayData) => void;
  onNoHoverDay: (day: DayData) => void;
  hoverDay: DayData | undefined;
}

export const TravelDateCell: React.FC<TravelDateCellProps> = ({
  visibleMonth,
  day,
  value,
  onValueChange,
  onHoverDay,
  onNoHoverDay,
  hoverDay,
}) => {
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
      if (startDate) {
        if (isBefore(day.date, startDate)) {
          onValueChangeHandler({
            startDate: day.dateString,
          });
        } else {
          onValueChangeHandler({
            endDate: day.dateString,
          });
        }
      } else {
        onValueChangeHandler({
          startDate: day.dateString,
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

  const isInSelectionRange =
    startDate && endDate
      ? isAfter(day.date, startDate) &&
        isBefore(day.date, endDate) &&
        !isSameDay(day.date, startDate) &&
        !isSameDay(day.date, endDate)
      : false;

  const isInHoverRange =
    startDate && hoverDate
      ? isAfter(day.date, startDate) &&
        isBefore(day.date, hoverDate) &&
        !isSameDay(day.date, startDate) &&
        !isSameDay(day.date, hoverDate)
      : false;

  const bgColors = getCellBackgroundColors(
    day.date,
    startDate,
    endDate,
    hoverDate,
    isInHoverRange,
    isInSelectionRange
  );

  return (
    <td
      className={styles.travelDateCell}
      onClick={onClickDate}
      onMouseOver={() => dayIsInMonth && onHoverDay(day)}
      onMouseOut={() => dayIsInMonth && onNoHoverDay(day)}
    >
      <Row>
        <Box height={"48px"} width={"24px"} background={bgColors.left}></Box>
        <Box height={"48px"} width={"24px"} background={bgColors.right}></Box>
      </Row>

      {dayIsInMonth && (
        <div
          className={cx(
            styles.contentWrapper,
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
