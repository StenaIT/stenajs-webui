import { Store, withState } from "@dump247/storybook-state";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { Box, StandardText } from "@stenajs-webui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import {
  NumericInputValueProps,
  useNumericInputValue
} from "./hooks/UseNumericInputValue";
import { NumericTextInput } from "./NumericTextInput";
import markdown from "./NumericTextInput.md";
import { defaultNumericTextInputThemeDark } from "./NumericTextInputTheme";

interface State {
  value: string;
}

interface StateNumber {
  value: number | undefined;
}

const NumericInput: React.FC<NumericInputValueProps> = ({
  value,
  onValueChange
}) => {
  const numericProps = useNumericInputValue(value, onValueChange);
  return <NumericTextInput {...numericProps} />;
};

storiesOf("forms/TextInput/NumericTextInput", module)
  .add(
    "standard",
    withState<State>({
      value: "5"
    })(({ store }: { store: Store<State> }) => (
      <div style={{ display: "inline-block" }}>
        <NumericTextInput
          value={store.state.value}
          onValueChange={value => store.set({ value })}
          className={"the-super-class"}
        />
        <StandardText>String value: {store.state.value}</StandardText>
      </div>
    )),
    { notes: { markdown } }
  )
  .add(
    "with number data type",
    withState<StateNumber>({
      value: 5
    })(({ store }: { store: Store<StateNumber> }) => (
      <div style={{ display: "inline-block" }}>
        <NumericInput
          value={store.state.value}
          onValueChange={value => store.set({ value })}
        />
        <StandardText>Number value: {store.state.value}</StandardText>
      </div>
    ))
  )
  .add(
    "with dark theme",
    withState<State>({
      value: "5"
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
      value: "5"
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
      value: "5"
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
      value: "5"
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
      value: "5"
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
      value: "5"
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
