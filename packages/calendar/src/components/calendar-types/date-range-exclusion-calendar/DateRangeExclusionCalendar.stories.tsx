import { Store, withState } from "@dump247/storybook-state";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CalendarTheme,
  DateRangeExclusionCalendar,
  extranetCalendarTheme,
  OnClickWeek,
  RenderWeekNumber,
  setDayStateValue,
  WeekData,
  WeekNumberCell,
} from "@stenajs-webui/calendar";
import { Box, Row, Space, StandardText } from "@stenajs-webui/core";
import { addDays, getISOWeek } from "date-fns";
import * as React from "react";

interface State {
  value: Array<Date>;
}

const disabledTomorrow = setDayStateValue(undefined, addDays(new Date(), 1), {
  highlights: ["disabled"],
});

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

export default {
  title: "calendar/Calendar/DateRangeExclusionCalendar",
};

export const Standard = withState<State>({
  value: [],
})(({ store }: { store: Store<State> }) => (
  <>
    <DateRangeExclusionCalendar
      onChange={(value) => store.set({ value })}
      value={store.state.value}
    />
    <Space />
    <Box background={"#eee"} spacing={2} indent={2}>
      <StandardText>Click to select date range.</StandardText>
      <Space />
      <StandardText>
        Hold ctrl (or cmd) and click to toggle individual dates.
      </StandardText>
    </Box>
  </>
));

export const TodayHighlighted = withState<State>({
  value: [],
})(({ store }: { store: Store<State> }) => (
  <DateRangeExclusionCalendar
    highlightToday
    onChange={(value) => store.set({ value })}
    value={store.state.value}
  />
));

export const WithDisabledDateTomorrow = withState<State>({
  value: [],
})(({ store }: { store: Store<State> }) => (
  <DateRangeExclusionCalendar
    onChange={(value) => store.set({ value })}
    value={store.state.value}
    statePerMonth={disabledTomorrow}
  />
));

export const WithDisabledAsDefault = withState<State>({
  value: [],
})(({ store }: { store: Store<State> }) => (
  <DateRangeExclusionCalendar
    defaultHighlights={["disabled"]}
    onChange={(value) => store.set({ value })}
    value={store.state.value}
    statePerMonth={statePerMonthWithTwoWeeksEnabled}
  />
));

export const WithMonthSwitcherBelow = withState<State>({
  value: [],
})(({ store }: { store: Store<State> }) => (
  <DateRangeExclusionCalendar
    onChange={(value) => store.set({ value })}
    value={store.state.value}
    monthSwitcherPlacement={"below"}
  />
));

export const WithMultipleMonths = withState<State>({
  value: [],
})(({ store }: { store: Store<State> }) => (
  <DateRangeExclusionCalendar
    onChange={(value) => store.set({ value })}
    numMonths={3}
    value={store.state.value}
  />
));

export const WithMultipleRows = withState<State>({
  value: [],
})(({ store }: { store: Store<State> }) => (
  <DateRangeExclusionCalendar
    onChange={(value) => store.set({ value })}
    numMonths={6}
    monthsPerRow={3}
    value={store.state.value}
  />
));

export const WithCustomWeekContent = withState<State>({
  value: [],
})(({ store }: { store: Store<State> }) => {
  const renderWeekNumber: RenderWeekNumber = (
    week: WeekData,
    theme: CalendarTheme,
    onClick?: OnClickWeek
  ) => {
    const now = new Date();
    return (
      <WeekNumberCell
        week={week}
        onClickWeek={onClick}
        theme={theme}
        background={
          week.startYear === now.getFullYear() &&
          week.weekNumber === getISOWeek(now) ? (
            <FontAwesomeIcon
              icon={faCoffee}
              color={"blue"}
              style={{ fontSize: 30 }}
            />
          ) : undefined
        }
      />
    );
  };

  return (
    <DateRangeExclusionCalendar
      onChange={(value) => store.set({ value })}
      value={store.state.value}
      renderWeekNumber={renderWeekNumber}
    />
  );
});

export const WithCustomContent = withState<State>({
  value: [],
})(({ store }: { store: Store<State> }) => (
  <DateRangeExclusionCalendar
    onChange={(value) => store.set({ value })}
    value={store.state.value}
    extraDayContent={() => (
      <Box position={"absolute"} top={"-10px"} right={"-10px"}>
        <FontAwesomeIcon icon={faCoffee} />
      </Box>
    )}
  />
));

export const WithInstanceCustomTheme = withState<State>({
  value: [],
})(({ store }: { store: Store<State> }) => (
  <Row>
    <DateRangeExclusionCalendar
      onChange={(value) => store.set({ value })}
      value={store.state.value}
      theme={extranetCalendarTheme}
    />
    <Space num={2} />
    <DateRangeExclusionCalendar
      onChange={(value) => store.set({ value })}
      value={store.state.value}
    />
  </Row>
));
