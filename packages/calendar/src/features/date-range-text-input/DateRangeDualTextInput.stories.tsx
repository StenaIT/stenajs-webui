import { Store, withState } from "@dump247/storybook-state";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { DateRangeDualTextInput } from "./DateRangeDualTextInput";
import { DateRangeOnChangeValue } from "../date-range/hooks/UseDateRangeOnClickDayHandler";

interface DateRangeState {
  value?: DateRangeOnChangeValue;
}

storiesOf("calendar/Kom igen/DateRangeDualTextInput", module).add(
  "testar lite",
  withState<DateRangeState>({
    value: undefined
  })(({ store }: { store: Store<DateRangeState> }) => (
    <div style={{ display: "inline-block" }}>
      <DateRangeDualTextInput
        value={store.state.value}
        onValueChange={value => store.set({ value })}
      />
    </div>
  ))
);
