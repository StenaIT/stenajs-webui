import { Store, withState } from "@dump247/storybook-state";
import { Row } from "@stenajs-webui/core";
import { ToggleButton } from "@stenajs-webui/elements";
import * as React from "react";

interface State {
  mon?: boolean;
  tue?: boolean;
  wed?: boolean;
  thu?: boolean;
  fri?: boolean;
  sat?: boolean;
  sun?: boolean;
}

export default {
  title: "elements/ToggleButton"
};

export const Standard = withState<State>({
  mon: true
})(({ store }: { store: Store<State> }) => (
  <Row>
    <ToggleButton
      label={"M"}
      pressed={store.state.mon}
      onClick={mon => store.set({ mon })}
      first
    />
    <ToggleButton
      label={"T"}
      pressed={store.state.tue}
      onClick={tue => store.set({ tue })}
    />
    <ToggleButton
      label={"W"}
      pressed={store.state.wed}
      onClick={wed => store.set({ wed })}
    />
    <ToggleButton
      label={"T"}
      pressed={store.state.thu}
      onClick={thu => store.set({ thu })}
    />
    <ToggleButton
      label={"F"}
      pressed={store.state.fri}
      onClick={fri => store.set({ fri })}
    />
    <ToggleButton
      label={"S"}
      pressed={store.state.sat}
      onClick={sat => store.set({ sat })}
    />
    <ToggleButton
      label={"S"}
      pressed={store.state.sun}
      onClick={sun => store.set({ sun })}
      last
    />
  </Row>
));

Standard.story = {
  name: "standard"
};
