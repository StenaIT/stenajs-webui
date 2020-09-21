import * as React from "react";
import { Month } from "../../util/calendar/CalendarDataFactory";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { Column, Row } from "@stenajs-webui/core";
import { MonthPickerCell } from "./MonthPickerCell";

interface Props extends ValueAndOnValueChangeProps<Month> {}

const monthMatrix = [
  [Month.JANUARY, Month.FEBRUARY, Month.MARCH],
  [Month.APRIL, Month.MAY, Month.JUNE],
  [Month.JULY, Month.AUGUST, Month.SEPTEMBER],
  [Month.OCTOBER, Month.NOVEMBER, Month.DECEMBER],
];

export const MonthPicker: React.FC<Props> = ({ value, onValueChange }) => {
  return (
    <Column>
      {monthMatrix.map((monthRow) => (
        <Row key={monthRow[0]}>
          {monthRow.map((month) => (
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
