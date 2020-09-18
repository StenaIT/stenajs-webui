import { Store, withState } from "@dump247/storybook-state";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { Space, StandardText } from "@stenajs-webui/core";
import {
  NumericInputValueProps,
  NumericTextInput,
  useNumericInputValue
} from "@stenajs-webui/forms";
import * as React from "react";
import markdown from "./NumericTextInput.md";

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

export default {
  title: "forms/TextInput/NumericTextInput"
};

export const Standard = withState<State>({
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
));

Standard.storyName = "standard";
Standard.parameters = { notes: { markdown } };

export const WithNumberDataType = withState<StateNumber>({
  value: 5
})(({ store }: { store: Store<StateNumber> }) => (
  <div style={{ display: "inline-block" }}>
    <NumericInput
      value={store.state.value}
      onValueChange={value => store.set({ value })}
    />
    <StandardText>Number value: {store.state.value}</StandardText>
  </div>
));

WithNumberDataType.storyName = "with number data type";

export const Disabled = withState<State>({
  value: "5"
})(({ store }: { store: Store<State> }) => (
  <div style={{ display: "inline-block" }}>
    <NumericTextInput
      disabled
      value={store.state.value}
      onValueChange={value => store.set({ value })}
    />
  </div>
));

Disabled.storyName = "disabled";

export const HiddenButtons = withState<State>({
  value: "5"
})(({ store }: { store: Store<State> }) => (
  <div style={{ display: "inline-block" }}>
    <NumericTextInput
      hideButtons
      value={store.state.value}
      onValueChange={value => store.set({ value })}
    />
  </div>
));

HiddenButtons.storyName = "hidden buttons";

export const WithLeftIcon = withState<State>({
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
));

WithLeftIcon.storyName = "with left icon";

export const WithContentRight = withState<State>({
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
));

WithContentRight.storyName = "with content right";

export const WithMinAndMax = withState<State>({
  value: "5"
})(({ store }: { store: Store<State> }) => (
  <div style={{ display: "inline-block" }}>
    <StandardText>Minimum 3, maximum 8</StandardText>
    <Space />
    <NumericTextInput
      min={3}
      max={8}
      value={store.state.value}
      onValueChange={value => store.set({ value })}
    />
  </div>
));

WithMinAndMax.storyName = "with min and max";
