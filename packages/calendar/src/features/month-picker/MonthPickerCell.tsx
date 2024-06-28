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
import {
  getDomIdForKeyboardKey,
  getDomIdForMonth,
} from "./MonthPickerKeyboardNavigation";

interface MonthPickerCellProps {
  month: Date;
  onClick: () => void;
  selected: boolean;
  locale: Locale;
  autoFocus: boolean;
  monthPickerId: string;
  firstAvailableMonth: Date;
  lastAvailableMonth: Date;
  rowIndex: number;
  columnIndex: number;
}

export const MonthPickerCell: React.FC<MonthPickerCellProps> = ({
  month,
  onClick,
  selected,
  locale,
  autoFocus,
  monthPickerId,
  columnIndex,
  rowIndex,
}) => {
  const label = useMemo(
    () => startCase(format(month, "MMM", { locale })),
    [locale, month]
  );

  const abbr = useMemo(
    () => startCase(format(month, "MMMM", { locale })),
    [locale, month]
  );

  const ref = useRef<HTMLButtonElement>(null);

  const domId = getDomIdForMonth(rowIndex, columnIndex, monthPickerId);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (ev) => {
      const nextDomId = getDomIdForKeyboardKey(
        ev.key,
        rowIndex,
        columnIndex,
        monthPickerId
      );
      if (nextDomId) {
        document.getElementById(nextDomId)?.focus();
      }
    },
    [columnIndex, monthPickerId, rowIndex]
  );

  return (
    <Row justifyContent={"center"} onKeyDown={onKeyDown}>
      {selected ? (
        <PrimaryButton
          id={domId}
          aria-label={abbr}
          label={label}
          onClick={onClick}
          aria-selected={true}
          autoFocus={autoFocus}
          ref={ref}
        />
      ) : (
        <FlatButton
          id={domId}
          label={label}
          aria-label={abbr}
          onClick={onClick}
        />
      )}
    </Row>
  );
};
