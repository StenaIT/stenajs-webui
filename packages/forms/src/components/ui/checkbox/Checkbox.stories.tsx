import { Store, withState } from "@dump247/storybook-state";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import {
  CheckboxWithLabel,
  defaultSimpleCheckboxThemeDark,
  SimpleCheckbox
} from "@stenajs-webui/forms";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";

interface State {
  value: boolean;
}

storiesOf("forms/Checkbox/SimpleCheckbox", module)
  .addDecorator(withInfo())
  .add(
    "standard",
    withState<State>({
      value: false
    })(({ store }: { store: Store<State> }) => (
      <SimpleCheckbox
        value={store.state.value}
        onChange={value => store.set({ value })}
      />
    ))
  )
  .add("checked and disabled", () => <SimpleCheckbox value={true} disabled />)
  .add("not checked and disabled", () => (
    <SimpleCheckbox value={false} disabled />
  ))
  .add(
    "with dark theme",
    withState<State>({
      value: false
    })(({ store }: { store: Store<State> }) => (
      <SimpleCheckbox
        value={store.state.value}
        onChange={value => store.set({ value })}
        theme={defaultSimpleCheckboxThemeDark}
      />
    ))
  )
  .add(
    "with custom theme",
    withState<State>({
      value: false
    })(({ store }: { store: Store<State> }) => (
      <SimpleCheckbox
        value={store.state.value}
        onChange={value => store.set({ value })}
        theme={{
          colors: {
            backgroundColor: "lightgray",
            borderColor: "black",
            iconColor: "white"
          },
          disabledColors: {
            backgroundColor: "lightgray",
            borderColor: "black",
            iconColor: "white"
          },
          checkedColors: {
            backgroundColor: "lightblue",
            borderColor: "red",
            iconColor: "white"
          },
          checkIcon: faCoffee,
          borderRadius: "2px"
        }}
      />
    ))
  );

storiesOf("forms/Checkbox/CheckboxWithLabel", module)
  .addDecorator(withInfo())
  .add(
    "standard",
    withState<State>({
      value: false
    })(({ store }: { store: Store<State> }) => (
      <CheckboxWithLabel
        label={"Add cake"}
        value={store.state.value}
        onChange={value => store.set({ value })}
      />
    ))
  );
