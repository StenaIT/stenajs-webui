import { Store, withState } from "@dump247/storybook-state";
import {
  DateRangeCalendar,
  DateRangeCalendarProps,
  DateRangeFocusedInput,
  setDayStateValue,
  useDateRangeCalendarState,
} from "@stenajs-webui/calendar";
import { addDays } from "date-fns";
import * as React from "react";
import markdown from "./DateRangeCalendar.md";

let statePerMonthWithTwoWeeksEnabled = {};
for (let i = 1; i < 7; i++) {
  statePerMonthWithTwoWeeksEnabled = setDayStateValue(
    statePerMonthWithTwoWeeksEnabled,
    addDays(new Date(), i),
    {
      highlights: ["enabled"],
    }
  );
}
for (let i = 10; i < 14; i++) {
  statePerMonthWithTwoWeeksEnabled = setDayStateValue(
    statePerMonthWithTwoWeeksEnabled,
    addDays(new Date(), i),
    {
      highlights: ["enabled"],
    }
  );
}

interface State {
  startDate?: Date;
  endDate?: Date;
  focusedInput: DateRangeFocusedInput;
}

function DateRangeCalendarWithState<T>({
  onChange,
}: Pick<DateRangeCalendarProps<T>, "onChange">) {
  const calendarProps = useDateRangeCalendarState();
  return <DateRangeCalendar {...calendarProps} onChange={onChange} />;
}

export default {
  title: "calendar/Calendar/DateRangeCalendar",
};

export const Standard = withState<State>({
  startDate: undefined,
  endDate: undefined,
  focusedInput: "startDate",
})(({ store }: { store: Store<State> }) => (
  <DateRangeCalendar
    startDate={store.state.startDate}
    endDate={store.state.endDate}
    focusedInput={store.state.focusedInput}
    setStartDate={(startDate) => store.set({ startDate })}
    setEndDate={(endDate) => store.set({ endDate })}
    setFocusedInput={(focusedInput) => store.set({ focusedInput })}
  />
));

Standard.parameters = {
  notes: { markdown },
};

export const WithStateHook = () => <DateRangeCalendarWithState />;

export const WithTodayHighlighted = withState<State>({
  startDate: undefined,
  endDate: undefined,
  focusedInput: "startDate",
})(({ store }: { store: Store<State> }) => (
  <DateRangeCalendar
    highlightToday
    startDate={store.state.startDate}
    endDate={store.state.endDate}
    focusedInput={store.state.focusedInput}
    setStartDate={(startDate) => store.set({ startDate })}
    setEndDate={(endDate) => store.set({ endDate })}
    setFocusedInput={(focusedInput) => store.set({ focusedInput })}
  />
));

export const WithDefaultHighlights = withState<State>({
  startDate: undefined,
  endDate: undefined,
  focusedInput: "startDate",
})(({ store }: { store: Store<State> }) => {
  return (
    <DateRangeCalendar
      startDate={store.state.startDate}
      endDate={store.state.endDate}
      focusedInput={store.state.focusedInput}
      setStartDate={(startDate) => store.set({ startDate })}
      setEndDate={(endDate) => store.set({ endDate })}
      setFocusedInput={(focusedInput) => store.set({ focusedInput })}
      defaultHighlights={["disabled"]}
      statePerMonth={statePerMonthWithTwoWeeksEnabled}
    />
  );
});

export const WithMultipleMonths = withState<State>({
  startDate: undefined,
  endDate: undefined,
  focusedInput: "startDate",
})(({ store }: { store: Store<State> }) => (
  <DateRangeCalendar
    numMonths={3}
    startDate={store.state.startDate}
    endDate={store.state.endDate}
    focusedInput={store.state.focusedInput}
    setStartDate={(startDate) => store.set({ startDate })}
    setEndDate={(endDate) => store.set({ endDate })}
    setFocusedInput={(focusedInput) => store.set({ focusedInput })}
  />
));

export const WithMultipleRows = withState<State>({
  startDate: undefined,
  endDate: undefined,
  focusedInput: "startDate",
})(({ store }: { store: Store<State> }) => (
  <DateRangeCalendar
    numMonths={6}
    monthsPerRow={3}
    startDate={store.state.startDate}
    endDate={store.state.endDate}
    focusedInput={store.state.focusedInput}
    setStartDate={(startDate) => store.set({ startDate })}
    setEndDate={(endDate) => store.set({ endDate })}
    setFocusedInput={(focusedInput) => store.set({ focusedInput })}
  />
));
