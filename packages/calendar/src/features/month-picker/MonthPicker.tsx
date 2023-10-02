import { enGB } from "date-fns/locale";
import * as React from "react";
import { Month } from "../../util/calendar/CalendarDataFactory";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { Column, Row } from "@stenajs-webui/core";
import { MonthPickerCell } from "./MonthPickerCell";

export interface MonthPickerProps extends ValueAndOnValueChangeProps<Month> {
  locale?: Locale;
}

const monthMatrix = [
  [Month.JANUARY, Month.FEBRUARY, Month.MARCH],
  [Month.APRIL, Month.MAY, Month.JUNE],
  [Month.JULY, Month.AUGUST, Month.SEPTEMBER],
  [Month.OCTOBER, Month.NOVEMBER, Month.DECEMBER],
];

export const MonthPicker: React.FC<MonthPickerProps> = ({
  value,
  onValueChange,
  locale = enGB,
}) => {
  return (
    <Column gap={1}>
      {monthMatrix.map((monthRow) => (
        <Row key={monthRow[0]} gap={1}>
          {monthRow.map((month) => (
            <MonthPickerCell
              key={month}
              month={month}
              onValueChange={onValueChange}
              value={value}
              locale={locale}
            />
          ))}
        </Row>
      ))}
    </Column>
  );
};
