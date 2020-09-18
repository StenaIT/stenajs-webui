import { Store, withState } from "@dump247/storybook-state";
import { DateInput, setDayStateValue } from "@stenajs-webui/calendar";
import { color } from "@storybook/addon-knobs";
import { addDays, addMonths } from "date-fns";
import * as React from "react";

interface DateInputState {
  value?: Date;
}

const disabledTomorrow = setDayStateValue(undefined, addDays(new Date(), 1), {
  highlights: ["disabled"]
});

export default {
  title: "calendar/Input/DateInput"
};

export const Standard = withState<DateInputState>({
  value: undefined
})(({ store }: { store: Store<DateInputState> }) => (
  <div style={{ display: "inline-block" }}>
    <DateInput
      value={store.state.value}
      onChange={value => store.set({ value })}
    />
  </div>
));

Standard.story = {
  name: "standard"
};

export const WithDisabledDateTomorrow = withState<DateInputState>({
  value: undefined
})(({ store }: { store: Store<DateInputState> }) => (
  <div style={{ display: "inline-block" }}>
    <DateInput
      value={store.state.value}
      onChange={value => store.set({ value })}
      calendarProps={{ statePerMonth: disabledTomorrow }}
    />
  </div>
));

WithDisabledDateTomorrow.story = {
  name: "with disabled date tomorrow"
};

export const Empty = () => (
  <div style={{ display: "inline-block" }}>
    <DateInput value={undefined} />
  </div>
);

Empty.story = {
  name: "empty"
};

export const UsingPortal = withState<DateInputState>({
  value: undefined
})(({ store }: { store: Store<DateInputState> }) => (
  <div style={{ display: "inline-block" }}>
    <DateInput
      value={store.state.value}
      onChange={value => store.set({ value })}
      portalTarget={document.body}
    />
  </div>
));

UsingPortal.story = {
  name: "using portal"
};

export const CustomDateFormat = () => (
  <div style={{ display: "inline-block" }}>
    <DateInput value={new Date()} displayFormat={"dd/MM/yyyy"} />
  </div>
);

CustomDateFormat.story = {
  name: "custom date format"
};

export const WithPreselectedValue = () => (
  <div style={{ display: "inline-block" }}>
    <DateInput value={addMonths(new Date(), 2)} />
  </div>
);

WithPreselectedValue.story = {
  name: "with preselected value"
};

export const WithBackgroundColor = () => (
  <div style={{ display: "inline-block" }}>
    <DateInput
      value={addMonths(new Date(), 2)}
      backgroundColor={color("Background", "#f0f060")}
    />
  </div>
);

WithBackgroundColor.story = {
  name: "with background color"
};
