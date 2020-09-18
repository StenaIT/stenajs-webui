import { Store, withState } from "@dump247/storybook-state";
import * as React from "react";
import { Months } from "@stenajs-webui/calendar/dist/util/calendar/CalendarDataFactory";
import { MonthPicker } from "@stenajs-webui/calendar";

interface DateRangeState {
  value?: Months;
}

export default {
  title: "calendar/Pickers/MonthPicker",
};

export const Standard = withState<DateRangeState>({
  value: undefined,
})(({ store }: { store: Store<DateRangeState> }) => (
  <div style={{ display: "inline-block" }}>
    <MonthPicker
      value={store.state.value}
      onValueChange={(value) => store.set({ value })}
    />
  </div>
));
