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
import { Column, exhaustSwitchCase, Heading } from "@stenajs-webui/core";
import { MonthPickerCell } from "./MonthPickerCell";
import { addMonths, isSameMonth } from "date-fns";
import { createMonths } from "./MonthPickerDataFactory";
import { useToday } from "../travel-calendar/util/UseToday";
import { SupportedLocaleCode } from "../localize-date-format/LocaleMapper";

export type MonthPickerSizeVariant = "small" | "medium" | "large";

export interface MonthPickerProps extends ValueAndOnValueChangeProps<Date> {
  localeCode: SupportedLocaleCode;
  firstMonth: Date;
  numMonths: number;
  onCancel?: () => void;
  size?: MonthPickerSizeVariant;
}

export const MonthPicker: React.FC<MonthPickerProps> = ({
  value,
  onValueChange,
  firstMonth,
  localeCode,
  numMonths,
  onCancel,
  size = "medium",
}) => {
  const monthPickerId = useId();
  const today = useToday();

  const clampedNumMonths = numMonths > 0 ? numMonths : 12;

  const [inited, setInited] = useState(false);

  const input = createMonths(firstMonth, clampedNumMonths, getNumColumns(size));

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
    [onCancel],
  );

  return (
    <Column gap={1} maxWidth={getWidth(size)} onKeyDown={onKeyDown}>
      {input.yearOrder.map((year, yearIndex) => {
        const { rows } = input.years[year];
        return (
          <React.Fragment key={year}>
            {(yearIndex !== 0 || year !== today.getFullYear()) && (
              <Heading variant={"h4"}>{year}</Heading>
            )}
            <table style={{ borderSpacing: "0 8px" }}>
              <tbody>
                {rows.map((r) => {
                  const { columns } = input.rows[r];
                  return (
                    <tr key={r}>
                      {columns.map(({ month, position }) => (
                        <td key={month.getMonth()}>
                          <MonthPickerCell
                            month={month}
                            firstAvailableMonth={firstMonth}
                            lastAvailableMonth={lastMonth}
                            localeCode={localeCode}
                            selected={value ? isSameMonth(value, month) : false}
                            autoFocus={inited}
                            onClick={() => onValueChange?.(month)}
                            monthPickerId={monthPickerId}
                            position={position}
                            size={size}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </React.Fragment>
        );
      })}
    </Column>
  );
};

const getWidth = (size: MonthPickerSizeVariant) => {
  // For cell size = 48px, 48*7 = 336px
  switch (size) {
    case "small":
      return "280px";
    case "medium":
      return "336px";
    case "large":
      return "448px";
    default:
      return exhaustSwitchCase(size, "336px");
  }
};

const getNumColumns = (size: MonthPickerSizeVariant): number => {
  switch (size) {
    case "small":
      return 3;
    case "medium":
      return 4;
    case "large":
      return 5;
    default:
      return exhaustSwitchCase(size, 4);
  }
};
