import { Store, withState } from "@dump247/storybook-state";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { CheckboxWithLabel } from "./CheckboxWithLabel";
import { SimpleCheckbox } from "./SimpleCheckbox";
import {
  defaultSimpleCheckboxTheme,
  defaultSimpleCheckboxThemeDark,
  SimpleCheckboxTheme
} from "./SimpleCheckboxTheme";

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
    })(({ store }: { store: Store<State> }) => {
      const theme: SimpleCheckboxTheme = {
        ...defaultSimpleCheckboxTheme,
        backgroundColor: "lightgray",
        borderColor: "black",
        iconColor: "white",
        backgroundColorDisabled: "lightgray",
        borderColorDisabled: "black",
        iconColorDisabled: "white",
        backgroundColorChecked: "lightblue",
        borderColorChecked: "red",
        iconColorChecked: "white",
        checkIcon: faCoffee,
        borderRadius: "2px"
      };
      return (
        <SimpleCheckbox
          value={store.state.value}
          onChange={value => store.set({ value })}
          theme={theme}
        />
      );
    })
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
