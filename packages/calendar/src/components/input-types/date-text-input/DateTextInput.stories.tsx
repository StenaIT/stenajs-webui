import { Store, withState } from "@dump247/storybook-state";
import { DateTextInput } from "@stenajs-webui/calendar";
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
    "dutch date format",
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
    <DateTextInput value={"invalid input"} variant={"error"} />
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
    "using portal",
    withState<DateTextInputState>({
      value: undefined
    })(({ store }: { store: Store<DateTextInputState> }) => (
      <DateTextInput
        value={store.state.value}
        onValueChange={value => store.set({ value })}
        portalTarget={document.body}
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
  );
