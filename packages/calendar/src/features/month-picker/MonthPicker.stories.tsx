import { Store, withState } from "@dump247/storybook-state";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Months } from "@stenajs-webui/calendar/dist/util/calendar/CalendarDataFactory";
import { MonthPicker } from "@stenajs-webui/calendar";

interface DateRangeState {
  value?: Months;
}

storiesOf("calendar/Pickers/MonthPicker", module)
  .add(
    "standard",
    withState<DateRangeState>({
      value: undefined
    })(({ store }: { store: Store<DateRangeState> }) => (
      <div style={{ display: "inline-block" }}>
        <MonthPicker
          value={store.state.value}
          onValueChange={value => store.set({ value })}
        />
      </div>
    ))
  )
  .add(
    "testar lite",
    withState<DateRangeState>({
      value: undefined
    })(({ store }: { store: Store<DateRangeState> }) => (
      <div style={{ display: "inline-block" }}>
        <MonthPicker
          value={store.state.value}
          onValueChange={value => store.set({ value })}
        />
      </div>
    ))
  );
