import { Store, withState } from "@dump247/storybook-state";
import { Inline } from "@stenajs-webui/core";
import { storiesOf } from "@storybook/react";
import { addDays } from "date-fns";
import * as React from "react";
import { DateRangeCalendarOnChangeValue } from "../calendar/features/DateRangeSelection";
import { DateRangeInput } from "./DateRangeInput";

interface DateRangeState {
  value: DateRangeCalendarOnChangeValue;
}

storiesOf("calendar/Input/DateRangeInput", module)
  .add(
    "standard",
    withState<DateRangeState>({
      value: {
        endDate: undefined,
        startDate: undefined
      }
    })(({ store }: { store: Store<DateRangeState> }) => (
      <Inline>
        <DateRangeInput
          value={store.state.value}
          onChange={value => store.set({ value })}
        />
      </Inline>
    ))
  )
  .add("empty", () => (
    <Inline>
      <DateRangeInput value={{}} />
    </Inline>
  ))
  .add("with preselected value", () => (
    <Inline>
      <DateRangeInput
        value={{ startDate: new Date(), endDate: addDays(new Date(), 5) }}
      />
    </Inline>
  ));
