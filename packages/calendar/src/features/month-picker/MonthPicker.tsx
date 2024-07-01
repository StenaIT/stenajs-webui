import { enGB } from "date-fns/locale";
import * as React from "react";
import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { Column, Heading, Row } from "@stenajs-webui/core";
import { MonthPickerCell } from "./MonthPickerCell";
import { addMonths, isSameMonth, Locale } from "date-fns";
import { createMonths } from "./MonthPickerDataFactory";

export interface MonthPickerProps extends ValueAndOnValueChangeProps<Date> {
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
  const monthPickerId = useId();

  const clampedNumMonths = numMonths > 0 ? numMonths : 12;

  const [inited, setInited] = useState(false);

  const input = createMonths(firstMonth, clampedNumMonths, 4);

  const lastMonth = useMemo(() => {
    return addMonths(firstMonth, clampedNumMonths);
  }, [clampedNumMonths, firstMonth]);

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
      {input.yearOrder.map((year) => {
        const { rows } = input.years[year];
        return (
          <React.Fragment key={year}>
            <Heading variant={"h4"}>{year}</Heading>
            {rows.map((r) => {
              const { columns } = input.rows[r];
              return (
                <Row gap={1} key={r}>
                  {columns.map(({ month, position }) => (
                    <Row
                      key={month.getMonth()}
                      width={"78px"}
                      justifyContent={"center"}
                    >
                      <MonthPickerCell
                        month={month}
                        firstAvailableMonth={firstMonth}
                        lastAvailableMonth={lastMonth}
                        locale={locale}
                        selected={value ? isSameMonth(value, month) : false}
                        autoFocus={inited}
                        onClick={() => onValueChange?.(month)}
                        monthPickerId={monthPickerId}
                        position={position}
                      />
                    </Row>
                  ))}
                </Row>
              );
            })}
          </React.Fragment>
        );
      })}
    </Column>
  );
};
