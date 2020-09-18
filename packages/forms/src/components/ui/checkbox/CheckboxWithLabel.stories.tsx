import { Store, withState } from "@dump247/storybook-state";
import * as knobs from "@storybook/addon-knobs";
import * as React from "react";
import { CheckboxWithLabel } from "@stenajs-webui/forms";

interface State {
  checked: boolean;
}

export default {
  title: "forms/Checkbox/CheckboxWithLabel"
};

export const Standard = withState<State>({
  checked: true
})(({ store }: { store: Store<State> }) => (
  <CheckboxWithLabel
    label={"Add cake"}
    value={store.state.checked}
    onValueChange={checked => store.set({ checked })}
    disabled={knobs.boolean("Disabled", false)}
  />
));

export const Disabled = () => (
  <CheckboxWithLabel
    label={"Add cake"}
    value={knobs.boolean("Checked", false)}
    indeterminate={knobs.boolean("Indeterminate", false)}
    disabled
  />
);
