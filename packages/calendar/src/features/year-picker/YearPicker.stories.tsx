import * as React from "react";
import { useState } from "react";
import { YearPicker } from "./YearPicker";

export default {
  title: "calendar/Pickers/YearPicker",
  component: YearPicker,
};

export const Standard = () => {
  const [value, setValue] = useState<number | undefined>(undefined);

  return (
    <div style={{ display: "inline-block" }}>
      <YearPicker value={value} onValueChange={setValue} />
    </div>
  );
};

export const EarlyYear = () => {
  const [value, setValue] = useState<number | undefined>(undefined);

  return (
    <div style={{ display: "inline-block" }}>
      <YearPicker value={value} onValueChange={setValue} />
    </div>
  );
};

export const LateYear = () => {
  const [value, setValue] = useState<number | undefined>(undefined);

  return (
    <div style={{ display: "inline-block" }}>
      <YearPicker value={value} onValueChange={setValue} />
    </div>
  );
};
