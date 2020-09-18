import { Store, withState } from "@dump247/storybook-state";
import * as React from "react";
import { DateRangeDualTextInput } from "./DateRangeDualTextInput";
import { DateRangeOnChangeValue } from "../date-range/hooks/UseDateRangeOnClickDayHandler";

interface DateRangeState {
  value?: DateRangeOnChangeValue;
}

export default {
  title: "calendar/Kom igen/DateRangeDualTextInput",
};

export const TestarLite = withState<DateRangeState>({
  value: undefined,
})(({ store }: { store: Store<DateRangeState> }) => (
  <div style={{ display: "inline-block" }}>
    <DateRangeDualTextInput
      value={store.state.value}
      onValueChange={(value) => store.set({ value })}
    />
  </div>
));

TestarLite.storyName = "testar lite";
