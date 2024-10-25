import * as React from "react";
import { useState } from "react";
import { MonthPicker } from "./MonthPicker";

export default {
  title: "calendar/Pickers/MonthPicker",
  component: MonthPicker,
};

export const Standard = () => {
  const [value, setValue] = useState<Date | undefined>(undefined);

  return (
    <div style={{ display: "inline-block" }}>
      <MonthPicker
        localeCode={"en-GB"}
        value={value}
        onValueChange={setValue}
        numMonths={24}
        firstMonth={new Date(2024, 0)}
      />
    </div>
  );
};
