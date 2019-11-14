import { Store, withState } from "@dump247/storybook-state";
import {
  DurationTextInput,
  DurationTextInputValue
} from "@stenajs-webui/forms";
import { storiesOf } from "@storybook/react";
import * as React from "react";

interface DateTextInputState {
  value?: DurationTextInputValue;
}

storiesOf("forms/TextInput/DurationTextInput", module).add(
  "standard",
  withState<DateTextInputState>({
    value: undefined
  })(({ store }: { store: Store<DateTextInputState> }) => (
    <DurationTextInput
      value={store.state.value}
      onValueChange={value => store.set({ value })}
    />
  ))
);
