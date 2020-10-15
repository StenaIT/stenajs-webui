import { Store, withState } from "@dump247/storybook-state";
import { SingleWeekCalendar } from "@stenajs-webui/calendar";
import * as React from "react";

interface State {
  week: string | undefined;
}

export default {
  title: "calendar/Calendar/SingleWeekCalendar",
};

export const Standard = withState<State>({
  week: undefined,
})(({ store }: { store: Store<State> }) => (
  <SingleWeekCalendar
    onChange={(week) => store.set({ week })}
    value={store.state.week}
  />
));
