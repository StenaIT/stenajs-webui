import { Store, withState } from "@dump247/storybook-state";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { DateTextInput } from "./DateTextInput";

interface DateTextInputState {
  value?: string;
}

storiesOf("calendar/Input/DateTextInput", module)
  .addDecorator(withInfo())
  .add(
    "standard",
    withState<DateTextInputState>({
      value: undefined
    })(({ store }: { store: Store<DateTextInputState> }) => (
      <DateTextInput
        value={store.state.value}
        onChange={value => store.set({ value })}
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
        onChange={value => store.set({ value })}
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
        onChange={value => store.set({ value })}
      />
    ))
  )
  .add(
    "without calender",
    withState<DateTextInputState>({
      value: undefined
    })(({ store }: { store: Store<DateTextInputState> }) => (
      <DateTextInput
        useCalenderIcon={false}
        value={store.state.value}
        onChange={value => store.set({ value })}
      />
    ))
  )
  .add(
    "with disabled calender icon",
    withState<DateTextInputState>({
      value: undefined
    })(({ store }: { store: Store<DateTextInputState> }) => (
      <DateTextInput
        disableCalender={true}
        value={store.state.value}
        onChange={value => store.set({ value })}
      />
    ))
  )
  .add(
    "disabled",
    withState<DateTextInputState>({
      value: undefined
    })(({ store }: { store: Store<DateTextInputState> }) => (
      <DateTextInput
        value={store.state.value}
        onChange={value => store.set({ value })}
        disabled={true}
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
        onChange={value => store.set({ value })}
      />
    ))
  );
