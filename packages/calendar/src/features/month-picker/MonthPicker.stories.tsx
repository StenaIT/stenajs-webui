import * as React from "react";
import { useState } from "react";
import { MonthPicker } from "./MonthPicker";
import { Month } from "../../util/calendar/CalendarDataFactory";

export default {
  title: "calendar/Pickers/MonthPicker",
  component: MonthPicker,
};

export const Standard = () => {
  const [value, setValue] = useState<Month | undefined>(undefined);

  return (
    <div style={{ display: "inline-block" }}>
      <MonthPicker value={value} onValueChange={setValue} />
    </div>
  );
};
