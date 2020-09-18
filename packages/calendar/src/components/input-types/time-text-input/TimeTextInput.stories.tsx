import { Store, withState } from "@dump247/storybook-state";
import { TimeTextInput } from "@stenajs-webui/calendar";
import { Box } from "@stenajs-webui/core";
import { color } from "@storybook/addon-knobs";
import * as React from "react";

interface TimeTextInputState {
  value?: string;
}

export default {
  title: "calendar/Input/TimeTextInput",
};

export const Standard = withState<TimeTextInputState>({
  value: undefined,
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <Box width={"125px"}>
    <TimeTextInput
      value={store.state.value}
      onValueChange={(value) => store.set({ value })}
    />
  </Box>
));

Standard.storyName = "standard";

export const Empty = withState<TimeTextInputState>({
  value: "",
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <TimeTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
  />
));

Empty.storyName = "empty";

export const WithTime = withState<TimeTextInputState>({
  value: "23:59",
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <TimeTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
  />
));

WithTime.storyName = "with time";

export const WithInvalidTime = withState<TimeTextInputState>({
  value: "9:xx",
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <TimeTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
  />
));

WithInvalidTime.storyName = "with invalid time";

export const WithoutIcon = withState<TimeTextInputState>({
  value: undefined,
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <TimeTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
    useIcon={false}
  />
));

WithoutIcon.storyName = "without icon";

export const WithoutPlaceholder = withState<TimeTextInputState>({
  value: undefined,
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <TimeTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
    showPlaceholder={false}
  />
));

WithoutPlaceholder.storyName = "without placeholder";

export const Disabled = withState<TimeTextInputState>({
  value: undefined,
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <TimeTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
    disabled={true}
  />
));

Disabled.storyName = "disabled";

export const Invalid = () => <TimeTextInput value={"invalid"} invalid={true} />;

Invalid.storyName = "invalid";

export const WithBackgroundColor = withState<TimeTextInputState>({
  value: undefined,
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <TimeTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
    backgroundColor={color("Background", "#f0f060")}
  />
));

WithBackgroundColor.storyName = "with background color";
