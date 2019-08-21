import { Store, withState } from "@dump247/storybook-state";
import { DateTextInput } from "@stenajs-webui/calendar";
import {
  createDateTextInputTheme,
  createStandardTextInputTheme
} from "@stenajs-webui/theme";
import { color } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

interface DateTextInputState {
  value?: string;
}

storiesOf("calendar/Input/DateTextInput", module)
  .add(
    "standard",
    withState<DateTextInputState>({
      value: undefined
    })(({ store }: { store: Store<DateTextInputState> }) => (
      <DateTextInput
        value={store.state.value}
        onValueChange={value => store.set({ value })}
      />
    ))
  )
  .add(
    "english date format",
    withState<DateTextInputState>({
      value: undefined
    })(({ store }: { store: Store<DateTextInputState> }) => (
      <DateTextInput
        dateFormat={"dd/MM/yyyy"}
        placeholder={"DD/MM/YYYY"}
        value={store.state.value}
        onValueChange={value => store.set({ value })}
      />
    ))
  )
  .add(
    "netherlands date format",
    withState<DateTextInputState>({
      value: undefined
    })(({ store }: { store: Store<DateTextInputState> }) => (
      <DateTextInput
        dateFormat={"dd-MM-yyyy"}
        placeholder={"DD-MM-YYYY"}
        value={store.state.value}
        onValueChange={value => store.set({ value })}
      />
    ))
  )
  .add("disabled", () => <DateTextInput value={""} disabled={true} />)
  .add("invalid", () => (
    <DateTextInput value={"invalid input"} invalid={true} />
  ))
  .add(
    "with no icon",
    withState<DateTextInputState>({
      value: undefined
    })(({ store }: { store: Store<DateTextInputState> }) => (
      <DateTextInput
        value={store.state.value}
        onValueChange={value => store.set({ value })}
        hideCalenderIcon={true}
      />
    ))
  )
  .add(
    "with disabled calendar",
    withState<DateTextInputState>({
      value: undefined
    })(({ store }: { store: Store<DateTextInputState> }) => (
      <DateTextInput
        value={store.state.value}
        onValueChange={value => store.set({ value })}
        disableCalender={true}
      />
    ))
  )
  .add(
    "custom calendar props",
    withState<DateTextInputState>({
      value: undefined
    })(({ store }: { store: Store<DateTextInputState> }) => (
      <DateTextInput
        calendarProps={{
          defaultHighlights: ["disabled"],
          highlightToday: true
        }}
        value={store.state.value}
        onValueChange={value => store.set({ value })}
      />
    ))
  )
  .add(
    "custom theme props",
    withState<DateTextInputState>({
      value: undefined
    })(({ store }: { store: Store<DateTextInputState> }) => (
      <DateTextInput
        value={store.state.value}
        onValueChange={value => store.set({ value })}
        theme={createDateTextInputTheme({
          standardTextInput: createStandardTextInputTheme({
            backgroundColor: color(
              "Background color for text input",
              "#fafad2"
            ),
            backgroundColorInvalid: color(
              "Background color for text input when invalid",
              "#f08080"
            ),
            textColor: color("Text color for text input", "#1b2e47")
          })
        })}
      />
    ))
  );
