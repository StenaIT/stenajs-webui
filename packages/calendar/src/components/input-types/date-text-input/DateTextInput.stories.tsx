import { DateTextInput } from "./DateTextInput";
import * as React from "react";
import { useState } from "react";

export default {
  title: "calendar/Input/DateTextInput",
  component: DateTextInput,
};

export const Standard = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return <DateTextInput value={value} onValueChange={setValue} />;
};

export const EnglishDateFormat = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <DateTextInput
      dateFormat={"dd/MM/yyyy"}
      placeholder={"DD/MM/YYYY"}
      value={value}
      onValueChange={setValue}
    />
  );
};

export const DutchDateFormat = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <DateTextInput
      dateFormat={"dd-MM-yyyy"}
      placeholder={"DD-MM-YYYY"}
      value={value}
      onValueChange={setValue}
    />
  );
};

export const Disabled = () => <DateTextInput value={""} disabled={true} />;

export const Invalid = () => (
  <DateTextInput value={"invalid input"} variant={"error"} />
);

export const WithNoIcon = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <DateTextInput
      value={value}
      onValueChange={setValue}
      hideCalenderIcon={true}
    />
  );
};

export const WithDisabledCalendar = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <DateTextInput
      value={value}
      onValueChange={setValue}
      disableCalender={true}
    />
  );
};

export const UsingPortal = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <DateTextInput
      value={value}
      onValueChange={setValue}
      portalTarget={document.body}
    />
  );
};

export const CustomCalendarProps = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <DateTextInput
      calendarProps={{
        defaultHighlights: ["disabled"],
        highlightToday: true,
      }}
      value={value}
      onValueChange={setValue}
    />
  );
};
