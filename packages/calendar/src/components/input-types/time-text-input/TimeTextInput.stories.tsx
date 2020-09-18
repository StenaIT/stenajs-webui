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

export const Empty = withState<TimeTextInputState>({
  value: "",
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <Box width={"125px"}>
    <TimeTextInput
      value={store.state.value}
      onValueChange={(value) => store.set({ value })}
    />
  </Box>
));

export const WithTime = withState<TimeTextInputState>({
  value: "23:59",
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <Box width={"125px"}>
    <TimeTextInput
      value={store.state.value}
      onValueChange={(value) => store.set({ value })}
    />
  </Box>
));

export const WithInvalidTime = withState<TimeTextInputState>({
  value: "9:xx",
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <Box width={"125px"}>
    <TimeTextInput
      value={store.state.value}
      onValueChange={(value) => store.set({ value })}
    />
  </Box>
));

export const WithoutIcon = withState<TimeTextInputState>({
  value: undefined,
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <Box width={"125px"}>
    <TimeTextInput
      value={store.state.value}
      onValueChange={(value) => store.set({ value })}
      useIcon={false}
    />
  </Box>
));

export const WithoutPlaceholder = withState<TimeTextInputState>({
  value: undefined,
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <Box width={"125px"}>
    <TimeTextInput
      value={store.state.value}
      onValueChange={(value) => store.set({ value })}
      showPlaceholder={false}
    />
  </Box>
));

export const Disabled = withState<TimeTextInputState>({
  value: undefined,
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <Box width={"125px"}>
    <TimeTextInput
      value={store.state.value}
      onValueChange={(value) => store.set({ value })}
      disabled={true}
    />
  </Box>
));

export const Invalid = () => (
  <Box width={"125px"}>
    <TimeTextInput value={"invalid"} invalid={true} />
  </Box>
);

export const WithVariantModified = withState<TimeTextInputState>({
  value: undefined,
})(({ store }: { store: Store<TimeTextInputState> }) => (
  <Box width={"125px"}>
    <TimeTextInput
      value={store.state.value}
      onValueChange={(value) => store.set({ value })}
      variant={"modified"}
    />
  </Box>
));
