import { Store, withState } from "@dump247/storybook-state";
import {
  DateRangeCalendarOnChangeValue,
  DateRangeInput,
} from "@stenajs-webui/calendar";
import { addDays } from "date-fns";
import * as React from "react";

interface DateRangeState {
  value: DateRangeCalendarOnChangeValue;
}

export default {
  title: "calendar/Input/DateRangeInput",
};

export const Standard = withState<DateRangeState>({
  value: {
    endDate: undefined,
    startDate: undefined,
  },
})(({ store }: { store: Store<DateRangeState> }) => (
  <div style={{ display: "inline-block" }}>
    <DateRangeInput
      value={store.state.value}
      onChange={(value) => store.set({ value })}
    />
  </div>
));

Standard.storyName = "standard";

export const Empty = () => (
  <div style={{ display: "inline-block" }}>
    <DateRangeInput onChange={() => {}} value={{}} />
  </div>
);

Empty.storyName = "empty";

export const UsingPortal = withState<DateRangeState>({
  value: {
    endDate: undefined,
    startDate: undefined,
  },
})(({ store }: { store: Store<DateRangeState> }) => (
  <div style={{ display: "inline-block" }}>
    <DateRangeInput
      value={store.state.value}
      onChange={(value) => store.set({ value })}
      portalTarget={document.body}
    />
  </div>
));

UsingPortal.storyName = "using portal";

export const WithPreselectedValue = withState<DateRangeState>({
  value: {
    endDate: undefined,
    startDate: undefined,
  },
})(({ store }: { store: Store<DateRangeState> }) => (
  <div style={{ display: "inline-block" }}>
    <DateRangeInput
      value={{ startDate: new Date(), endDate: addDays(new Date(), 5) }}
      onChange={(value) => store.set({ value })}
    />
  </div>
));

WithPreselectedValue.storyName = "with preselected value";

export const WithTodayHighlighted = withState<DateRangeState>({
  value: {
    endDate: undefined,
    startDate: undefined,
  },
})(({ store }: { store: Store<DateRangeState> }) => (
  <div style={{ display: "inline-block" }}>
    <DateRangeInput
      value={store.state.value}
      onChange={(value) => store.set({ value })}
      calendarProps={{ highlightToday: true }}
    />
  </div>
));

WithTodayHighlighted.storyName = "with today highlighted";
