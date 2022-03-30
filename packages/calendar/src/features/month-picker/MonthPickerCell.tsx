import * as React from "react";
import { useMemo } from "react";
import { Row } from "@stenajs-webui/core";
import { FlatButton, PrimaryButton } from "@stenajs-webui/elements";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { Month } from "../../util/calendar/CalendarDataFactory";
import { format } from "date-fns";

interface Props extends ValueAndOnValueChangeProps<Month> {
  month: Month;
}

export const MonthPickerCell: React.FC<Props> = ({
  value,
  onValueChange,
  month,
}) => {
  const label = useMemo(() => {
    const now = new Date(2000, month, 1);
    return format(now, "MMM");
  }, [month]);

  return (
    <Row width={"64px"} justifyContent={"center"} spacing={0.5} indent={0.5}>
      {value === month ? (
        <PrimaryButton
          label={label}
          onClick={() => onValueChange && onValueChange(month)}
        />
      ) : (
        <FlatButton
          label={label}
          onClick={() => onValueChange && onValueChange(month)}
        />
      )}
    </Row>
  );
};
