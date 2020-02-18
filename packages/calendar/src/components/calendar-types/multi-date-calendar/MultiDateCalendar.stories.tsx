import { Store, withState } from "@dump247/storybook-state";
import {
  CalendarTheme,
  extranetCalendarTheme,
  MultiDateCalendar,
  OnClickWeek,
  RenderWeekNumber,
  setDayStateValue,
  WeekData,
  WeekNumberCell
} from "@stenajs-webui/calendar";
import { Box, Row, Space } from "@stenajs-webui/core";
import { storiesOf } from "@storybook/react";
import { addDays, getISOWeek } from "date-fns";
import * as React from "react";
import { faCoffee } from "@fortawesome/pro-light-svg-icons/faCoffee";
import { Icon } from "@stenajs-webui/elements";

interface State {
  value?: Array<Date>;
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

storiesOf("calendar/Calendar/MultiDateCalendar", module)
  .add(
    "standard",
    withState<State>({
      value: undefined
    })(({ store }: { store: Store<State> }) => (
      <MultiDateCalendar
        onChange={value => {
          store.set({ value });
        }}
        value={store.state.value}
      />
    ))
  )
  .add(
    "today highlighted",
    withState<State>({
      value: undefined
    })(({ store }: { store: Store<State> }) => (
      <MultiDateCalendar
        highlightToday
        onChange={value => store.set({ value })}
        value={store.state.value}
      />
    ))
  )
  .add(
    "with disabled date tomorrow",
    withState<State>({
      value: undefined
    })(({ store }: { store: Store<State> }) => (
      <MultiDateCalendar
        onChange={value => store.set({ value })}
        value={store.state.value}
        statePerMonth={disabledTomorrow}
      />
    ))
  )
  .add(
    "with disabled as default",
    withState<State>({
      value: undefined
    })(({ store }: { store: Store<State> }) => (
      <MultiDateCalendar
        defaultHighlights={["disabled"]}
        onChange={value => store.set({ value })}
        value={store.state.value}
        statePerMonth={statePerMonthWithTwoWeeksEnabled}
      />
    ))
  )
  .add(
    "with month switcher below",
    withState<State>({
      value: undefined
    })(({ store }: { store: Store<State> }) => (
      <MultiDateCalendar
        onChange={value => store.set({ value })}
        value={store.state.value}
        monthSwitcherPlacement={"below"}
      />
    ))
  )
  .add(
    "with multiple months",
    withState<State>({
      value: undefined
    })(({ store }: { store: Store<State> }) => (
      <MultiDateCalendar
        onChange={value => store.set({ value })}
        numMonths={3}
        value={store.state.value}
      />
    ))
  )
  .add(
    "with multiple rows",
    withState<State>({
      value: undefined
    })(({ store }: { store: Store<State> }) => (
      <MultiDateCalendar
        onChange={value => store.set({ value })}
        numMonths={6}
        monthsPerRow={3}
        value={store.state.value}
      />
    ))
  )
  .add(
    "with custom week content",
    withState<State>({
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
                <Icon icon={faCoffee} color={"blue"} style={{ fontSize: 30 }} />
              ) : (
                undefined
              )
            }
          />
        );
      };

      return (
        <MultiDateCalendar
          onChange={value => store.set({ value })}
          value={store.state.value}
          renderWeekNumber={renderWeekNumber}
        />
      );
    })
  )
  .add(
    "with custom content",
    withState<State>({
      value: undefined
    })(({ store }: { store: Store<State> }) => (
      <MultiDateCalendar
        onChange={value => store.set({ value })}
        value={store.state.value}
        extraDayContent={() => (
          <Box position={"absolute"} top={"-10px"} right={"-10px"}>
            <Icon icon={faCoffee} />
          </Box>
        )}
      />
    ))
  )
  .add(
    "with instance custom theme",
    withState<State>({
      value: undefined
    })(({ store }: { store: Store<State> }) => (
      <Row>
        <MultiDateCalendar
          onChange={value => store.set({ value })}
          value={store.state.value}
          theme={extranetCalendarTheme}
        />
        <Space num={2} />
        <MultiDateCalendar
          onChange={value => store.set({ value })}
          value={store.state.value}
        />
      </Row>
    ))
  );
