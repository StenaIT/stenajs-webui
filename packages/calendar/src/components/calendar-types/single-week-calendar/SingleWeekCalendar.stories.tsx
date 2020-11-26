import * as React from "react";
import { useState } from "react";
import { SingleWeekCalendar } from "./SingleWeekCalendar";
import { useDateRangeCalendarState } from "../date-range-calendar/hooks/UseDateRangeCalendarState";

export default {
  title: "calendar/Calendar/SingleWeekCalendar",
  component: SingleWeekCalendar,
};

export const Standard = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const props = useDateRangeCalendarState();

  return <SingleWeekCalendar onChange={setValue} value={value} {...props} />;
};
