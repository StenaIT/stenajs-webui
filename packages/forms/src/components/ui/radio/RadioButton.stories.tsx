import { Store, withState } from "@dump247/storybook-state";
import {
  defaultRadioButtonTheme,
  defaultRadioButtonThemeDark,
  RadioButton,
  RadioButtonWithLabel
} from "@stenajs-webui/forms";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";

interface State {
  value: boolean;
}

export const addRadioButtonStories = () => {
  storiesOf("Form/RadioButton/RadioButton", module)
    .addDecorator(withInfo())
    .add(
      "standard",
      withState<State>({
        value: false
      })(({ store }: { store: Store<State> }) => (
        <RadioButton
          value={store.state.value}
          onChange={value => store.set({ value })}
        />
      ))
    )
    .add("checked and disabled", () => <RadioButton value={true} disabled />)
    .add("not checked and disabled", () => (
      <RadioButton value={false} disabled />
    ))
    .add(
      "with dark theme",
      withState<State>({
        value: false
      })(({ store }: { store: Store<State> }) => (
        <RadioButton
          value={store.state.value}
          onChange={value => store.set({ value })}
          theme={defaultRadioButtonThemeDark}
        />
      ))
    )
    .add(
      "with custom theme",
      withState<State>({
        value: false
      })(({ store }: { store: Store<State> }) => (
        <RadioButton
          value={store.state.value}
          onChange={value => store.set({ value })}
          theme={{
            ...defaultRadioButtonTheme,
            notCheckedColor: "magenta",
            iconColor: "darkgreen",
            iconSize: 40
          }}
        />
      ))
    );

  storiesOf("Form/RadioButton/RadioButtonWithLabel", module)
    .addDecorator(withInfo())
    .add(
      "standard",
      withState<State>({
        value: false
      })(({ store }: { store: Store<State> }) => (
        <RadioButtonWithLabel
          label={"Add cake"}
          value={store.state.value}
          onChange={value => store.set({ value })}
        />
      ))
    )
    .add(
      "with custom theme",
      withState<State>({
        value: false
      })(({ store }: { store: Store<State> }) => (
        <RadioButtonWithLabel
          label={"Add cake"}
          value={store.state.value}
          onChange={value => store.set({ value })}
          theme={{
            ...defaultRadioButtonTheme,
            iconColor: "pink",
            iconSize: 40,
            textColor: "lightblue",
            textSize: "30px"
          }}
        />
      ))
    );
};
