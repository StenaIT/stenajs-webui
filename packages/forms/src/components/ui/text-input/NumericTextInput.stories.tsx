import { Store, withState } from "@dump247/storybook-state";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { Box, StandardText } from "@stenajs-webui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { NumericTextInput } from "./NumericTextInput";
import { defaultNumericTextInputThemeDark } from "./NumericTextInputTheme";

interface State {
  value: number;
}

storiesOf("forms/TextInput/NumericTextInput", module)
  .add(
    "standard",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <div style={{ display: "inline-block" }}>
        <NumericTextInput
          value={store.state.value}
          onValueChange={value => store.set({ value })}
        />
      </div>
    ))
  )
  .add(
    "with dark theme",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <div style={{ display: "inline-block" }}>
        <Box width={"400px"} background={"#2e4662"} indent={4} spacing={4}>
          <NumericTextInput
            value={store.state.value}
            onValueChange={value => store.set({ value })}
            theme={defaultNumericTextInputThemeDark}
          />
        </Box>
      </div>
    ))
  )
  .add(
    "disabled",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <div style={{ display: "inline-block" }}>
        <NumericTextInput
          disabled
          value={store.state.value}
          onValueChange={value => store.set({ value })}
        />
      </div>
    ))
  )
  .add(
    "hidden buttons",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <div style={{ display: "inline-block" }}>
        <NumericTextInput
          hideButtons
          value={store.state.value}
          onValueChange={value => store.set({ value })}
        />
      </div>
    ))
  )
  .add(
    "with left icon",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <div style={{ display: "inline-block" }}>
        <NumericTextInput
          iconLeft={faCoffee}
          value={store.state.value}
          min={1}
          max={8}
          onValueChange={value => store.set({ value })}
        />
      </div>
    ))
  )
  .add(
    "with content right",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <div style={{ display: "inline-block" }}>
        <NumericTextInput
          value={store.state.value}
          min={1}
          max={8}
          contentRight={
            <div style={{ color: "grey" }}>
              <StandardText>sec</StandardText>
            </div>
          }
          onValueChange={value => store.set({ value })}
        />
      </div>
    ))
  )
  .add(
    "with min and max",
    withState<State>({
      value: 5
    })(({ store }: { store: Store<State> }) => (
      <div style={{ display: "inline-block" }}>
        <NumericTextInput
          min={3}
          max={8}
          value={store.state.value}
          onValueChange={value => store.set({ value })}
        />
      </div>
    ))
  );
