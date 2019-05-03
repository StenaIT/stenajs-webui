import { Store, withState } from "@dump247/storybook-state";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { Box, StandardText } from "@stenajs-webui/core";
import {
  defaultNumericTextInputThemeDark,
  NumericTextInput
} from "@stenajs-webui/forms";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";

interface State {
  value: number;
}

storiesOf("Form/TextInput/NumericTextInput", module)
  .addDecorator(withInfo())
  .add(
    "standard",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <NumericTextInput
        value={store.state.value}
        onChange={value => store.set({ value })}
      />
    ))
  )
  .add(
    "with dark theme",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <Box width={"400px"} background={"#2e4662"} indent={4} spacing={4}>
        <NumericTextInput
          value={store.state.value}
          onChange={value => store.set({ value })}
          theme={defaultNumericTextInputThemeDark}
        />
      </Box>
    ))
  )
  .add(
    "disabled",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <NumericTextInput
        disabled
        value={store.state.value}
        onChange={value => store.set({ value })}
      />
    ))
  )
  .add(
    "hidden buttons",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <NumericTextInput
        hideButtons
        value={store.state.value}
        onChange={value => store.set({ value })}
      />
    ))
  )
  .add(
    "with left icon",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <NumericTextInput
        iconLeft={faCoffee}
        value={store.state.value}
        min={1}
        max={8}
        onChange={value => store.set({ value })}
      />
    ))
  )
  .add(
    "with content right",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <NumericTextInput
        value={store.state.value}
        min={1}
        max={8}
        contentRight={
          <div style={{ color: "grey" }}>
            <StandardText>sec</StandardText>
          </div>
        }
        onChange={value => store.set({ value })}
      />
    ))
  )
  .add(
    "with min and max",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <NumericTextInput
        min={3}
        max={8}
        value={store.state.value}
        onChange={value => store.set({ value })}
      />
    ))
  );
