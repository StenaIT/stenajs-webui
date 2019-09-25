import { Box } from "@stenajs-webui/core";
import { Store, withState } from "@dump247/storybook-state";
import {
  DateRangeCalendar,
  DateRangeCalendarProps,
  DateRangeFocusedInput,
  setDayStateValue,
  useDateRangeCalendarState,
  TranslationProvider,
  getTranslations,
  travelCalendarTheme,
  dayHighlightSelect,
  ExtraDayContentProps
} from "@stenajs-webui/calendar";
import { storiesOf } from "@storybook/react";
import { addDays } from "date-fns";
import * as React from "react";
import markdown from "./DateRangeCalendar.md";

let statePerMonthWithTwoWeeksEnabled = {};
for (let i = 1; i < 7; i++) {
  statePerMonthWithTwoWeeksEnabled = setDayStateValue(
    statePerMonthWithTwoWeeksEnabled,
    addDays(new Date(), i),
    {
      highlights: ["enabled"]
    }
  );
}
for (let i = 10; i < 14; i++) {
  statePerMonthWithTwoWeeksEnabled = setDayStateValue(
    statePerMonthWithTwoWeeksEnabled,
    addDays(new Date(), i),
    {
      highlights: ["enabled"]
    }
  );
}

interface State {
  startDate?: Date;
  endDate?: Date;
  focusedInput: DateRangeFocusedInput;
}

function DateRangeCalendarWithState<T>({
  onChange
}: Pick<DateRangeCalendarProps<T>, "onChange">) {
  const calendarProps = useDateRangeCalendarState();
  return <DateRangeCalendar {...calendarProps} onChange={onChange} />;
}

storiesOf("calendar/Calendar/DateRangeCalendar", module)
  .add(
    "standard",
    withState<State>({
      startDate: undefined,
      endDate: undefined,
      focusedInput: "startDate"
    })(({ store }: { store: Store<State> }) => (
      <DateRangeCalendar
        startDate={store.state.startDate}
        endDate={store.state.endDate}
        focusedInput={store.state.focusedInput}
        setStartDate={startDate => store.set({ startDate })}
        setEndDate={endDate => store.set({ endDate })}
        setFocusedInput={focusedInput => store.set({ focusedInput })}
      />
    )),
    {
      notes: { markdown }
    }
  )
  .add("with state hook", () => <DateRangeCalendarWithState />)
  .add(
    "with today highlighted",
    withState<State>({
      startDate: undefined,
      endDate: undefined,
      focusedInput: "startDate"
    })(({ store }: { store: Store<State> }) => (
      <DateRangeCalendar
        highlightToday
        startDate={store.state.startDate}
        endDate={store.state.endDate}
        focusedInput={store.state.focusedInput}
        setStartDate={startDate => store.set({ startDate })}
        setEndDate={endDate => store.set({ endDate })}
        setFocusedInput={focusedInput => store.set({ focusedInput })}
      />
    ))
  )
  .add(
    "with default highlights",
    withState<State>({
      startDate: undefined,
      endDate: undefined,
      focusedInput: "startDate"
    })(({ store }: { store: Store<State> }) => {
      return (
        <DateRangeCalendar
          startDate={store.state.startDate}
          endDate={store.state.endDate}
          focusedInput={store.state.focusedInput}
          setStartDate={startDate => store.set({ startDate })}
          setEndDate={endDate => store.set({ endDate })}
          setFocusedInput={focusedInput => store.set({ focusedInput })}
          defaultHighlights={["disabled"]}
          statePerMonth={statePerMonthWithTwoWeeksEnabled}
        />
      );
    })
  )
  .add(
    "with multiple months",
    withState<State>({
      startDate: undefined,
      endDate: undefined,
      focusedInput: "startDate"
    })(({ store }: { store: Store<State> }) => (
      <DateRangeCalendar
        numMonths={3}
        startDate={store.state.startDate}
        endDate={store.state.endDate}
        focusedInput={store.state.focusedInput}
        setStartDate={startDate => store.set({ startDate })}
        setEndDate={endDate => store.set({ endDate })}
        setFocusedInput={focusedInput => store.set({ focusedInput })}
      />
    ))
  )
  .add(
    "with multiple rows",
    withState<State>({
      startDate: undefined,
      endDate: undefined,
      focusedInput: "startDate"
    })(({ store }: { store: Store<State> }) => (
      <DateRangeCalendar
        numMonths={6}
        monthsPerRow={3}
        startDate={store.state.startDate}
        endDate={store.state.endDate}
        focusedInput={store.state.focusedInput}
        setStartDate={startDate => store.set({ startDate })}
        setEndDate={endDate => store.set({ endDate })}
        setFocusedInput={focusedInput => store.set({ focusedInput })}
      />
    ))
  )
  .add(
    "standard translated",
    withState<State>({
      startDate: undefined,
      endDate: undefined,
      focusedInput: "startDate"
    })(({ store }: { store: Store<State> }) => (
      <TranslationProvider value={getTranslations("sv")}>
        <DateRangeCalendar
          startDate={store.state.startDate}
          endDate={store.state.endDate}
          focusedInput={store.state.focusedInput}
          setStartDate={startDate => store.set({ startDate })}
          setEndDate={endDate => store.set({ endDate })}
          setFocusedInput={focusedInput => store.set({ focusedInput })}
        />
      </TranslationProvider>
    )),
    {
      notes: { markdown }
    }
  )
  .add(
    "travel",
    withState<State>({
      startDate: undefined,
      endDate: undefined,
      focusedInput: "startDate"
    })(({ store }: { store: Store<State> }) => {
      const renderDayContent: React.ComponentType<ExtraDayContentProps<{}>> = ({
        dayState
      }) =>
        dayHighlightSelect<JSX.Element | null>(
          dayState,
          [],
          ["today", "enabled"],
          [
            <Box
              position={"absolute"}
              top={"3px"}
              left={"3px"}
              style={{
                backgroundColor: "#ea143d",
                width: "6px",
                height: "6px",
                borderRadius: "50%"
              }}
            />,
            null
          ],
          <Box
            position={"absolute"}
            top={0}
            left={0}
            bottom={0}
            right={0}
            background="#949494"
            width="70%"
            height="1px"
            style={{
              margin: "auto",
              transform: "rotate(-45deg)"
            }}
          />
        ) as JSX.Element;
      return (
        <DateRangeCalendar
          highlightToday
          startDate={store.state.startDate}
          endDate={store.state.endDate}
          focusedInput={store.state.focusedInput}
          setStartDate={startDate => store.set({ startDate })}
          setEndDate={endDate => store.set({ endDate })}
          setFocusedInput={focusedInput => store.set({ focusedInput })}
          defaultHighlights={["disabled"]}
          theme={travelCalendarTheme}
          statePerMonth={statePerMonthWithTwoWeeksEnabled}
          extraDayContent={renderDayContent}
        />
      );
    }),
    {
      notes: { markdown }
    }
  );
