import { startCase } from "lodash-es";
import * as React from "react";
import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Row } from "@stenajs-webui/core";
import { FlatButton, PrimaryButton } from "@stenajs-webui/elements";
import { format, Locale } from "date-fns";
import { Month } from "../../util/calendar/CalendarDataFactory";

interface MonthPickerCellProps {
  year: number;
  month: Month;
  onClick: () => void;
  selected: boolean;
  locale: Locale;
  autoFocus: boolean;
}

export const MonthPickerCell: React.FC<MonthPickerCellProps> = ({
  month,
  year,
  onClick,
  selected,
  locale,
  autoFocus,
}) => {
  const label = useMemo(
    () => startCase(format(new Date(year, month, 1), "MMM", { locale })),
    [locale, year, month]
  );

  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>((ev) => {
    console.log(ev.key);
  }, []);

  return (
    <Row justifyContent={"center"} onKeyDown={onKeyDown}>
      {selected ? (
        <PrimaryButton
          label={label}
          onClick={onClick}
          aria-selected={true}
          autoFocus={autoFocus}
          ref={ref}
        />
      ) : (
        <FlatButton label={label} onClick={onClick} />
      )}
    </Row>
  );
};
