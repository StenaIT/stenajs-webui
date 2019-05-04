import { Store, withState } from "@dump247/storybook-state";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import { addDays } from "date-fns";
import * as React from "react";
import { DateRangeCalendarOnChangeValue } from "../calendar/features/DateRangeSelection";
import { DateRangeInput } from "./DateRangeInput";

interface DateRangeState {
  value: DateRangeCalendarOnChangeValue;
}

storiesOf("calendar/input/DateRangeInput", module)
  .addDecorator(withInfo())
  .add(
    "standard",
    withState<DateRangeState>({
      value: {
        endDate: undefined,
        startDate: undefined
      }
    })(({ store }: { store: Store<DateRangeState> }) => (
      <DateRangeInput
        value={store.state.value}
        onChange={value => store.set({ value })}
      />
    ))
  )
  .add("empty", () => <DateRangeInput value={{}} />)
  .add("with preselected value", () => (
    <DateRangeInput
      value={{ startDate: new Date(), endDate: addDays(new Date(), 5) }}
    />
  ));
