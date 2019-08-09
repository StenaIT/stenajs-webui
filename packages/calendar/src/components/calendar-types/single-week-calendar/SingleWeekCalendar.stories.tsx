import { Store, withState } from "@dump247/storybook-state";
import { SingleWeekCalendar } from "@stenajs-webui/calendar";
import { storiesOf } from "@storybook/react";
import * as React from "react";

interface State {
  week: string | undefined;
}

storiesOf("calendar/Calendar/SingleWeekCalendar", module).add(
  "standard",
  withState<State>({
    week: undefined
  })(({ store }: { store: Store<State> }) => (
    <SingleWeekCalendar
      onChange={week => store.set({ week })}
      value={store.state.week}
    />
  ))
);
