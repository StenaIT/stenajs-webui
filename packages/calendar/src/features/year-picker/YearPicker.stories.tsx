import { Store, withState } from "@dump247/storybook-state";
import * as React from "react";
import { YearPicker } from "@stenajs-webui/calendar";

interface DateRangeState {
  value?: number;
}

export default {
  title: "calendar/Pickers/YearPicker",
};

export const Standard = withState<DateRangeState>({
  value: undefined,
})(({ store }: { store: Store<DateRangeState> }) => (
  <div style={{ display: "inline-block" }}>
    <YearPicker
      value={store.state.value}
      onValueChange={(value) => store.set({ value })}
    />
  </div>
));
