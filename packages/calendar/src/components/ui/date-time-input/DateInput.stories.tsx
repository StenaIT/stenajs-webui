import { Store, withState } from "@dump247/storybook-state";
import { Inline } from "@stenajs-webui/core";
import { storiesOf } from "@storybook/react";
import { addMonths } from "date-fns";
import * as React from "react";
import { DateInput } from "./DateInput";

interface DateInputState {
  value?: Date;
}

storiesOf("calendar/Input/DateInput", module)
  .add(
    "standard",
    withState<DateInputState>({
      value: undefined
    })(({ store }: { store: Store<DateInputState> }) => (
      <Inline>
        <DateInput
          value={store.state.value}
          onChange={value => store.set({ value })}
        />
      </Inline>
    ))
  )
  .add("empty", () => (
    <Inline>
      <DateInput value={undefined} />
    </Inline>
  ))
  .add("with preselected value", () => (
    <Inline>
      <DateInput value={addMonths(new Date(), 2)} />
    </Inline>
  ));
