import { Store, withState } from "@dump247/storybook-state";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CalendarTheme,
  extranetCalendarTheme,
  OnClickWeek,
  RenderWeekNumber,
  setDayStateValue,
  MultiDateCalendar,
  WeekData,
  WeekNumberCell,
} from "@stenajs-webui/calendar";
import { Box, Row, Space } from "@stenajs-webui/core";
import { addDays, getISOWeek } from "date-fns";
import * as React from "react";

interface State {
  value?: Array<Date>;
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
  title: "calendar/Calendar/MultiDateCalendar",
};

export const Standard = withState<State>({
  value: undefined,
})(({ store }: { store: Store<State> }) => (
  <MultiDateCalendar
    onChange={(value) => {
      store.set({ value });
    }}
    value={store.state.value}
  />
));

Standard.storyName = "standard";

export const TodayHighlighted = withState<State>({
  value: undefined,
})(({ store }: { store: Store<State> }) => (
  <MultiDateCalendar
    highlightToday
    onChange={(value) => store.set({ value })}
    value={store.state.value}
  />
));

TodayHighlighted.storyName = "today highlighted";

export const WithDisabledDateTomorrow = withState<State>({
  value: undefined,
})(({ store }: { store: Store<State> }) => (
  <MultiDateCalendar
    onChange={(value) => store.set({ value })}
    value={store.state.value}
    statePerMonth={disabledTomorrow}
  />
));

WithDisabledDateTomorrow.storyName = "with disabled date tomorrow";

export const WithDisabledAsDefault = withState<State>({
  value: undefined,
})(({ store }: { store: Store<State> }) => (
  <MultiDateCalendar
    defaultHighlights={["disabled"]}
    onChange={(value) => store.set({ value })}
    value={store.state.value}
    statePerMonth={statePerMonthWithTwoWeeksEnabled}
  />
));

WithDisabledAsDefault.storyName = "with disabled as default";

export const WithMonthSwitcherBelow = withState<State>({
  value: undefined,
})(({ store }: { store: Store<State> }) => (
  <MultiDateCalendar
    onChange={(value) => store.set({ value })}
    value={store.state.value}
    monthSwitcherPlacement={"below"}
  />
));

WithMonthSwitcherBelow.storyName = "with month switcher below";

export const WithMultipleMonths = withState<State>({
  value: undefined,
})(({ store }: { store: Store<State> }) => (
  <MultiDateCalendar
    onChange={(value) => store.set({ value })}
    numMonths={3}
    value={store.state.value}
  />
));

WithMultipleMonths.storyName = "with multiple months";

export const WithMultipleRows = withState<State>({
  value: undefined,
})(({ store }: { store: Store<State> }) => (
  <MultiDateCalendar
    onChange={(value) => store.set({ value })}
    numMonths={6}
    monthsPerRow={3}
    value={store.state.value}
  />
));

WithMultipleRows.storyName = "with multiple rows";

export const WithCustomWeekContent = withState<State>({
  value: undefined,
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
    <MultiDateCalendar
      onChange={(value) => store.set({ value })}
      value={store.state.value}
      renderWeekNumber={renderWeekNumber}
    />
  );
});

WithCustomWeekContent.storyName = "with custom week content";

export const WithCustomContent = withState<State>({
  value: undefined,
})(({ store }: { store: Store<State> }) => (
  <MultiDateCalendar
    onChange={(value) => store.set({ value })}
    value={store.state.value}
    extraDayContent={() => (
      <Box position={"absolute"} top={"-10px"} right={"-10px"}>
        <FontAwesomeIcon icon={faCoffee} />
      </Box>
    )}
  />
));

WithCustomContent.storyName = "with custom content";

export const WithInstanceCustomTheme = withState<State>({
  value: undefined,
})(({ store }: { store: Store<State> }) => (
  <Row>
    <MultiDateCalendar
      onChange={(value) => store.set({ value })}
      value={store.state.value}
      theme={extranetCalendarTheme}
    />
    <Space num={2} />
    <MultiDateCalendar
      onChange={(value) => store.set({ value })}
      value={store.state.value}
    />
  </Row>
));

WithInstanceCustomTheme.storyName = "with instance custom theme";
