import { Store, withState } from "@dump247/storybook-state";
import {
  DateRangeCalendarOnChangeValue,
  DateRangeInput,
} from "@stenajs-webui/calendar";
import { addDays, subDays } from "date-fns";
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

export const Empty = () => (
  <div style={{ display: "inline-block" }}>
    <DateRangeInput onChange={() => {}} value={{}} />
  </div>
);

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

export const WithInvalidRange = () => (
  <div style={{ display: "inline-block" }}>
    <DateRangeInput
      value={{ startDate: new Date(), endDate: subDays(new Date(), 7) }}
      onChange={() => {}}
    />
  </div>
);
