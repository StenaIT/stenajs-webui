import * as React from "react";
import { Months } from "../../util/calendar/CalendarDataFactory";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { Column, Row } from "@stenajs-webui/core";
import { MonthPickerCell } from "./MonthPickerCell";

interface Props extends ValueAndOnValueChangeProps<Months> {}

const monthMatrix = [
  [Months.JANUARY, Months.FEBRUARY, Months.MARCH],
  [Months.APRIL, Months.MAY, Months.JUNE],
  [Months.JULY, Months.AUGUST, Months.SEPTEMBER],
  [Months.OCTOBER, Months.NOVEMBER, Months.DECEMBER]
];

export const MonthPicker: React.FC<Props> = ({ value, onValueChange }) => {
  return (
    <Column>
      {monthMatrix.map((monthRow, i) => (
        <Row key={i}>
          {monthRow.map(month => (
            <MonthPickerCell
              key={month}
              month={month}
              onValueChange={onValueChange}
              value={value}
            />
          ))}
        </Row>
      ))}
    </Column>
  );
};
