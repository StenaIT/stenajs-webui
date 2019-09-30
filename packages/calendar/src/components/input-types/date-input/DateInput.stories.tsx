import { Store, withState } from "@dump247/storybook-state";
import { DateInput, setDayStateValue } from "@stenajs-webui/calendar";
import { color } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import { addDays, addMonths } from "date-fns";
import * as React from "react";

interface DateInputState {
  value?: Date;
}

const disabledTomorrow = setDayStateValue(undefined, addDays(new Date(), 1), {
  highlights: ["disabled"]
});

storiesOf("calendar/Input/DateInput", module)
  .add(
    "standard",
    withState<DateInputState>({
      value: undefined
    })(({ store }: { store: Store<DateInputState> }) => (
      <div style={{ display: "inline-block" }}>
        <DateInput
          value={store.state.value}
          onChange={value => store.set({ value })}
        />
      </div>
    ))
  )
  .add(
    "with disabled date tomorrow",
    withState<DateInputState>({
      value: undefined
    })(({ store }: { store: Store<DateInputState> }) => (
      <div style={{ display: "inline-block" }}>
        <DateInput
          value={store.state.value}
          onChange={value => store.set({ value })}
          calendarProps={{ statePerMonth: disabledTomorrow }}
        />
      </div>
    ))
  )
  .add("empty", () => (
    <div style={{ display: "inline-block" }}>
      <DateInput value={undefined} />
    </div>
  ))
  .add(
    "using portal",
    withState<DateInputState>({
      value: undefined
    })(({ store }: { store: Store<DateInputState> }) => (
      <div style={{ display: "inline-block" }}>
        <DateInput
          value={store.state.value}
          onChange={value => store.set({ value })}
          portalTarget={document.body}
        />
      </div>
    ))
  )
  .add("custom date format", () => (
    <div style={{ display: "inline-block" }}>
      <DateInput value={new Date()} displayFormat={"dd/MM/yyyy"} />
    </div>
  ))
  .add("with preselected value", () => (
    <div style={{ display: "inline-block" }}>
      <DateInput value={addMonths(new Date(), 2)} />
    </div>
  ))
  .add("with background color", () => (
    <div style={{ display: "inline-block" }}>
      <DateInput
        value={addMonths(new Date(), 2)}
        backgroundColor={color("Background", "#f0f060")}
      />
    </div>
  ));
