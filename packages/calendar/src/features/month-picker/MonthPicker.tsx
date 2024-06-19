import { enGB } from "date-fns/locale";
import * as React from "react";
import { Month } from "../../util/calendar/CalendarDataFactory";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { Column, Heading, Row } from "@stenajs-webui/core";
import { MonthPickerCell } from "./MonthPickerCell";

export interface MonthPickerValue {
  month: Month;
  year: number;
}

export interface MonthPickerProps
  extends ValueAndOnValueChangeProps<MonthPickerValue> {
  locale?: Locale;
  firstMonth: Date;
  numMonths: number;
}

export const MonthPicker: React.FC<MonthPickerProps> = ({
  value,
  onValueChange,
  locale = enGB,
  firstMonth,
  numMonths,
}) => {
  const input = createMonths(firstMonth, numMonths);

  return (
    <Column gap={1} maxWidth={"336px"}>
      {input.years.map(({ year, months }) => (
        <>
          <Heading variant={"h4"}>{year}</Heading>
          <Row gap={1} flexWrap={"wrap"}>
            {months.map((month) => (
              <MonthPickerCell
                key={month}
                month={month}
                year={year}
                locale={locale}
                selected={value?.month === month && value?.year === year}
                onClick={() => onValueChange?.({ month, year })}
              />
            ))}
          </Row>
        </>
      ))}
    </Column>
  );
};

interface MonthInput {
  years: Array<YearInput>;
}

interface YearInput {
  year: number;
  months: Array<Month>;
}

const createMonths = (firstMonth: Date, numMonths: number): MonthInput => {
  let currentYear = firstMonth.getFullYear();
  let currentMonth = firstMonth.getMonth();

  const input: MonthInput = {
    years: [{ year: currentYear, months: [currentMonth] }],
  };

  for (let i = 1; i < numMonths; i++) {
    if (currentMonth === Month.DECEMBER) {
      currentYear++;
      currentMonth = 0;
      input.years.push({ year: currentYear, months: [currentMonth] });
    } else {
      currentMonth++;
      input.years[input.years.length - 1].months.push(currentMonth);
    }
  }

  return input;
};

export const createFirstDate = (date: Date): MonthPickerValue => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
  };
};
