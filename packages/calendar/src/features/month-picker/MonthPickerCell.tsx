import * as React from "react";
import { useMemo } from "react";
import { Row } from "@stenajs-webui/core";
import { FlatButton, PrimaryButton } from "@stenajs-webui/elements";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { Months } from "../../util/calendar/CalendarDataFactory";
import { format } from "date-fns";

interface Props extends ValueAndOnValueChangeProps<Months> {
  month: Months;
}

export const MonthPickerCell: React.FC<Props> = ({
  value,
  onValueChange,
  month,
}) => {
  const label = useMemo(() => {
    const now = new Date();
    now.setMonth(month);
    return format(now, "MMM");
  }, [month]);

  return (
    <Row width={"64px"} justifyContent={"center"} spacing={0.5} indent={0.5}>
      {value === month ? (
        <PrimaryButton label={label} />
      ) : (
        <FlatButton
          label={label}
          onClick={() => onValueChange && onValueChange(month)}
        />
      )}
    </Row>
  );
};
