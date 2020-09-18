import { Store, withState } from "@dump247/storybook-state";
import * as React from "react";
import {
  DateRangeDualTextInput,
  DateRangeOnChangeValue,
} from "@stenajs-webui/calendar";

interface DateRangeState {
  value?: DateRangeOnChangeValue;
}

export default {
  title: "calendar/Input/DateRangeDualTextInput",
};

export const Standard = withState<DateRangeState>({
  value: undefined,
})(({ store }: { store: Store<DateRangeState> }) => (
  <div style={{ display: "inline-block" }}>
    <DateRangeDualTextInput
      value={store.state.value}
      onValueChange={(value) => {
        console.log("onValueChange", value);
        store.set({ value });
      }}
    />
  </div>
));
