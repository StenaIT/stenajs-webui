import { Store, withState } from "@dump247/storybook-state";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import {
  Checkbox,
  CheckboxTheme,
  CheckboxWithLabel,
  defaultCheckboxTheme,
  defaultCheckboxThemeDark
} from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

type State = { checked: boolean };

storiesOf("forms/Checkbox", module)
  .add(
    "standard",
    withState<State>({
      checked: true
    })(({ store }: { store: Store<State> }) => (
      <Checkbox
        value={store.state.checked}
        onValueChange={checked => store.set({ checked })}
        disabled={knobs.boolean("Disabled", false)}
      />
    ))
  )
  .add("with DOM name", () => (
    <Checkbox
      value={knobs.boolean("Checked", false)}
      disabled={knobs.boolean("Disabled", false)}
      name={knobs.text("Name", "agree")}
    />
  ))
  .add("checked and disabled", () => <Checkbox value={true} disabled />)
  .add("not checked and disabled", () => <Checkbox value={false} disabled />)
  .add("indeterminate", () => (
    <Checkbox
      value={knobs.boolean("Checked", false)}
      indeterminate={knobs.boolean("Indeterminate", false)}
    />
  ))
  .add("indeterminate with dark theme", () => (
    <Checkbox
      value={knobs.boolean("Checked", false)}
      indeterminate={knobs.boolean("Indeterminate", false)}
      theme={defaultCheckboxThemeDark}
    />
  ))
  .add("with dark theme", () => (
    <Checkbox
      value={knobs.boolean("Checked", false)}
      disabled={knobs.boolean("Disabled", false)}
      theme={defaultCheckboxThemeDark}
    />
  ))
  .add("with custom theme", () => {
    const theme: CheckboxTheme = {
      ...defaultCheckboxTheme,
      backgroundColorNotChecked: "lightgray",
      borderColorNotChecked: "black",
      iconColorNotChecked: "white",
      backgroundColorDisabled: "lightgray",
      borderColorDisabled: "black",
      iconColorDisabled: "white",
      backgroundColorChecked: "lightblue",
      borderColorChecked: "red",
      iconColorChecked: "white",
      checkIcon: faCoffee,
      borderRadius: "2px"
    };
    return <Checkbox value={knobs.boolean("Checked", false)} theme={theme} />;
  });

storiesOf("forms/Checkbox/CheckboxWithLabel", module).add(
  "standard",
  withState<State>({
    checked: true
  })(({ store }: { store: Store<State> }) => (
    <CheckboxWithLabel
      label={"Add cake"}
      value={store.state.checked}
      onValueChange={checked => store.set({ checked })}
      disabled={knobs.boolean("Disabled", false)}
    />
  ))
);
