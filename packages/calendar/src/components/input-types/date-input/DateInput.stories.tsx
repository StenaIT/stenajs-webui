import { Store, withState } from "@dump247/storybook-state";
import { DateInput, setDayStateValue } from "@stenajs-webui/calendar";
import { addDays, addMonths } from "date-fns";
import * as React from "react";

interface DateInputState {
  value?: Date;
}

const disabledTomorrow = setDayStateValue(undefined, addDays(new Date(), 1), {
  highlights: ["disabled"],
});

export default {
  title: "calendar/Input/DateInput",
};

export const Standard = withState<DateInputState>({
  value: undefined,
})(({ store }: { store: Store<DateInputState> }) => (
  <div style={{ display: "inline-block" }}>
    <DateInput
      value={store.state.value}
      onChange={(value) => store.set({ value })}
    />
  </div>
));

export const WithDisabledDateTomorrow = withState<DateInputState>({
  value: undefined,
})(({ store }: { store: Store<DateInputState> }) => (
  <div style={{ display: "inline-block" }}>
    <DateInput
      value={store.state.value}
      onChange={(value) => store.set({ value })}
      calendarProps={{ statePerMonth: disabledTomorrow }}
    />
  </div>
));

export const Empty = () => (
  <div style={{ display: "inline-block" }}>
    <DateInput value={undefined} />
  </div>
);

export const UsingPortal = withState<DateInputState>({
  value: undefined,
})(({ store }: { store: Store<DateInputState> }) => (
  <div style={{ display: "inline-block" }}>
    <DateInput
      value={store.state.value}
      onChange={(value) => store.set({ value })}
      portalTarget={document.body}
    />
  </div>
));

export const CustomDateFormat = () => (
  <div style={{ display: "inline-block" }}>
    <DateInput value={new Date()} displayFormat={"dd/MM/yyyy"} />
  </div>
);

export const WithPreselectedValue = () => (
  <div style={{ display: "inline-block" }}>
    <DateInput value={addMonths(new Date(), 2)} />
  </div>
);

export const WithVariant = () => (
  <div style={{ display: "inline-block" }}>
    <DateInput value={addMonths(new Date(), 2)} variant={"error"} />
  </div>
);
