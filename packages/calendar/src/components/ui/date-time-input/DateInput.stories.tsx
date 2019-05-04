import { Store, withState } from "@dump247/storybook-state";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import { addMonths } from "date-fns";
import * as React from "react";
import { DateInput } from "./DateInput";

interface DateInputState {
  value?: Date;
}

storiesOf("calendar/input/DateInput", module)
  .addDecorator(withInfo())
  .add(
    "standard",
    withState<DateInputState>({
      value: undefined
    })(({ store }: { store: Store<DateInputState> }) => (
      <DateInput
        value={store.state.value}
        onChange={value => store.set({ value })}
      />
    ))
  )
  .add("empty", () => <DateInput value={undefined} />)
  .add("with preselected value", () => (
    <DateInput value={addMonths(new Date(), 2)} />
  ));
