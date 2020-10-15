import { Store, withState } from "@dump247/storybook-state";
import { DateTextInput } from "@stenajs-webui/calendar";
import * as React from "react";

interface DateTextInputState {
  value?: string;
}

export default {
  title: "calendar/Input/DateTextInput",
};

export const Standard = withState<DateTextInputState>({
  value: undefined,
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
  />
));

export const EnglishDateFormat = withState<DateTextInputState>({
  value: undefined,
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    dateFormat={"dd/MM/yyyy"}
    placeholder={"DD/MM/YYYY"}
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
  />
));

export const DutchDateFormat = withState<DateTextInputState>({
  value: undefined,
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    dateFormat={"dd-MM-yyyy"}
    placeholder={"DD-MM-YYYY"}
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
  />
));

export const Disabled = () => <DateTextInput value={""} disabled={true} />;

export const Invalid = () => (
  <DateTextInput value={"invalid input"} variant={"error"} />
);

export const WithNoIcon = withState<DateTextInputState>({
  value: undefined,
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
    hideCalenderIcon={true}
  />
));

export const WithDisabledCalendar = withState<DateTextInputState>({
  value: undefined,
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
    disableCalender={true}
  />
));

export const UsingPortal = withState<DateTextInputState>({
  value: undefined,
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
    portalTarget={document.body}
  />
));

export const CustomCalendarProps = withState<DateTextInputState>({
  value: undefined,
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    calendarProps={{
      defaultHighlights: ["disabled"],
      highlightToday: true,
    }}
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
  />
));
