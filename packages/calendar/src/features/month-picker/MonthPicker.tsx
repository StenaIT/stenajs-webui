import { enGB } from "date-fns/locale";
import * as React from "react";
import { KeyboardEventHandler, useCallback, useEffect, useState } from "react";
import { Month } from "../../util/calendar/CalendarDataFactory";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { Column, Heading, Row } from "@stenajs-webui/core";
import { MonthPickerCell } from "./MonthPickerCell";
import { Locale } from "date-fns";

export interface MonthPickerValue {
  month: Month;
  year: number;
}

export interface MonthPickerProps
  extends ValueAndOnValueChangeProps<MonthPickerValue> {
  locale?: Locale;
  firstMonth: Date;
  numMonths: number;
  onCancel?: () => void;
}

export const MonthPicker: React.FC<MonthPickerProps> = ({
  value,
  onValueChange,
  locale = enGB,
  firstMonth,
  numMonths,
  onCancel,
}) => {
  const [inited, setInited] = useState(false);

  const input = createMonths(firstMonth, numMonths);

  useEffect(() => {
    setInited(true);
  }, []);

  const onKeyDown = useCallback<KeyboardEventHandler>(
    (ev) => {
      if (ev.key === "Escape") {
        onCancel?.();
        ev.preventDefault();
        ev.stopPropagation();
      }
    },
    [onCancel]
  );

  return (
    <Column gap={1} maxWidth={"336px"} onKeyDown={onKeyDown}>
      {input.years.map(({ year, months }) => (
        <React.Fragment key={year}>
          <Heading variant={"h4"}>{year}</Heading>
          <Row gap={1} flexWrap={"wrap"}>
            {months.map((month) => (
              <Row width={"78px"} justifyContent={"center"}>
                <MonthPickerCell
                  key={month}
                  month={month}
                  year={year}
                  locale={locale}
                  selected={value?.month === month && value?.year === year}
                  autoFocus={inited}
                  onClick={() => onValueChange?.({ month, year })}
                />
              </Row>
            ))}
          </Row>
        </React.Fragment>
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
