import { Store, withState } from "@dump247/storybook-state";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CalendarTheme,
  extranetCalendarTheme,
  OnClickWeek,
  RenderWeekNumber,
  setDayStateValue,
  SingleDateCalendar,
  WeekData,
  WeekNumberCell
} from "@stenajs-webui/calendar";
import { Box, Row, Space } from "@stenajs-webui/core";
import { addDays, getISOWeek } from "date-fns";
import * as React from "react";

interface State {
  value?: Date;
}

const disabledTomorrow = setDayStateValue(undefined, addDays(new Date(), 1), {
  highlights: ["disabled"]
});

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

export default {
  title: "calendar/Calendar/SingleDateCalendar"
};

export const Standard = withState<State>({
  value: undefined
})(({ store }: { store: Store<State> }) => (
  <SingleDateCalendar
    onChange={value => store.set({ value })}
    value={store.state.value}
  />
));

Standard.story = {
  name: "standard"
};

export const TodayHighlighted = withState<State>({
  value: undefined
})(({ store }: { store: Store<State> }) => (
  <SingleDateCalendar
    highlightToday
    onChange={value => store.set({ value })}
    value={store.state.value}
  />
));

TodayHighlighted.story = {
  name: "today highlighted"
};

export const WithDisabledDateTomorrow = withState<State>({
  value: undefined
})(({ store }: { store: Store<State> }) => (
  <SingleDateCalendar
    onChange={value => store.set({ value })}
    value={store.state.value}
    statePerMonth={disabledTomorrow}
  />
));

WithDisabledDateTomorrow.story = {
  name: "with disabled date tomorrow"
};

export const WithDisabledAsDefault = withState<State>({
  value: undefined
})(({ store }: { store: Store<State> }) => (
  <SingleDateCalendar
    defaultHighlights={["disabled"]}
    onChange={value => store.set({ value })}
    value={store.state.value}
    statePerMonth={statePerMonthWithTwoWeeksEnabled}
  />
));

WithDisabledAsDefault.story = {
  name: "with disabled as default"
};

export const WithMonthSwitcherBelow = withState<State>({
  value: undefined
})(({ store }: { store: Store<State> }) => (
  <SingleDateCalendar
    onChange={value => store.set({ value })}
    value={store.state.value}
    monthSwitcherPlacement={"below"}
  />
));

WithMonthSwitcherBelow.story = {
  name: "with month switcher below"
};

export const WithMultipleMonths = withState<State>({
  value: undefined
})(({ store }: { store: Store<State> }) => (
  <SingleDateCalendar
    onChange={value => store.set({ value })}
    numMonths={3}
    value={store.state.value}
  />
));

WithMultipleMonths.story = {
  name: "with multiple months"
};

export const WithMultipleRows = withState<State>({
  value: undefined
})(({ store }: { store: Store<State> }) => (
  <SingleDateCalendar
    onChange={value => store.set({ value })}
    numMonths={6}
    monthsPerRow={3}
    value={store.state.value}
  />
));

WithMultipleRows.story = {
  name: "with multiple rows"
};

export const WithCustomWeekContent = withState<State>({
  value: undefined
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
          ) : (
            undefined
          )
        }
      />
    );
  };

  return (
    <SingleDateCalendar
      onChange={value => store.set({ value })}
      value={store.state.value}
      renderWeekNumber={renderWeekNumber}
    />
  );
});

WithCustomWeekContent.story = {
  name: "with custom week content"
};

export const WithCustomContent = withState<State>({
  value: undefined
})(({ store }: { store: Store<State> }) => (
  <SingleDateCalendar
    onChange={value => store.set({ value })}
    value={store.state.value}
    extraDayContent={() => (
      <Box position={"absolute"} top={"-10px"} right={"-10px"}>
        <FontAwesomeIcon icon={faCoffee} />
      </Box>
    )}
  />
));

WithCustomContent.story = {
  name: "with custom content"
};

export const WithInstanceCustomTheme = withState<State>({
  value: undefined
})(({ store }: { store: Store<State> }) => (
  <Row>
    <SingleDateCalendar
      onChange={value => store.set({ value })}
      value={store.state.value}
      theme={extranetCalendarTheme}
    />
    <Space num={2} />
    <SingleDateCalendar
      onChange={value => store.set({ value })}
      value={store.state.value}
    />
  </Row>
));

WithInstanceCustomTheme.story = {
  name: "with instance custom theme"
};
