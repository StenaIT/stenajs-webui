import { Store, withState } from "@dump247/storybook-state";
import { storiesOf } from "@storybook/react";
import { addMonths } from "date-fns";
import * as React from "react";
import { DateInput } from "@stenajs-webui/calendar";

interface DateInputState {
  value?: Date;
}

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
  .add("empty", () => (
    <div style={{ display: "inline-block" }}>
      <DateInput value={undefined} />
    </div>
  ))
  .add("custom date format", () => (
    <div style={{ display: "inline-block" }}>
      <DateInput value={new Date()} displayFormat={"dd/MM/yyyy"} />
    </div>
  ))
  .add("with preselected value", () => (
    <div style={{ display: "inline-block" }}>
      <DateInput value={addMonths(new Date(), 2)} />
    </div>
  ));
