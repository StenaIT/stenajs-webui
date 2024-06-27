import { startCase } from "lodash-es";
import * as React from "react";
import { useMemo } from "react";
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
}

export const MonthPickerCell: React.FC<MonthPickerCellProps> = ({
  month,
  year,
  onClick,
  selected,
  locale,
}) => {
  const label = useMemo(() => {
    const now = new Date(year, month, 1);
    return startCase(format(now, "MMM", { locale }));
  }, [locale, year, month]);

  return (
    <Row justifyContent={"center"}>
      {selected ? (
        <PrimaryButton label={label} onClick={onClick} aria-selected={true} />
      ) : (
        <FlatButton label={label} onClick={onClick} />
      )}
    </Row>
  );
};
