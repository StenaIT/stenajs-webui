import * as React from "react";
import { Box, Row, Text } from "@stenajs-webui/core";
import {
  DayData,
  MonthData,
} from "../../../../util/calendar/CalendarDataFactory";
import { TravelDateInputValue } from "../TravelDateInput";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { useMemo } from "react";
import styles from "./TravelDateCell.module.css";

export interface TravelDateCellProps
  extends ValueAndOnValueChangeProps<TravelDateInputValue> {
  day: DayData;
  visibleMonth: MonthData;
  onHoverDay: (day: DayData) => void;
  onNoHoverDay: (day: DayData) => void;
}

export const TravelDateCell: React.FC<TravelDateCellProps> = ({
  visibleMonth,
  day,
  value,
  onValueChange,
  onHoverDay,
  onNoHoverDay,
}) => {
  const startDate = useMemo(
    () => (value?.startDate ? new Date(value.startDate) : undefined),
    [value?.startDate]
  );

  const endDate = useMemo(
    () => (value?.endDate ? new Date(value.endDate) : undefined),
    [value?.endDate]
  );

  const onValueChangeHandler = (v: Partial<TravelDateInputValue>) => {
    onValueChange?.({ ...value, ...v });
  };

  const dayIsInMonth = day.month === visibleMonth.monthInYear;

  return (
    <td
      className={styles.travelDateCell}
      onClick={() =>
        dayIsInMonth &&
        onValueChangeHandler({
          startDate: day.dateString,
        })
      }
      onMouseOver={() => dayIsInMonth && onHoverDay(day)}
      onMouseOut={() => dayIsInMonth && onNoHoverDay(day)}
    >
      <Row>
        <Box height={"48px"} width={"24px"} background={"transparent"}></Box>
        <Box height={"48px"} width={"24px"} background={"red"}></Box>
      </Row>
      {dayIsInMonth && (
        <div className={styles.contentWrapper}>
          <Text>{day.dayOfMonth}</Text>
        </div>
      )}
    </td>
  );
};
