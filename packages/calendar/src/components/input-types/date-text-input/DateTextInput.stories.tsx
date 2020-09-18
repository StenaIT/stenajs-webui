import { Store, withState } from "@dump247/storybook-state";
import { DateTextInput } from "@stenajs-webui/calendar";
import * as React from "react";

interface DateTextInputState {
  value?: string;
}

export default {
  title: "calendar/Input/DateTextInput"
};

export const Standard = withState<DateTextInputState>({
  value: undefined
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    value={store.state.value}
    onValueChange={value => store.set({ value })}
  />
));

Standard.story = {
  name: "standard"
};

export const EnglishDateFormat = withState<DateTextInputState>({
  value: undefined
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    dateFormat={"dd/MM/yyyy"}
    placeholder={"DD/MM/YYYY"}
    value={store.state.value}
    onValueChange={value => store.set({ value })}
  />
));

EnglishDateFormat.story = {
  name: "english date format"
};

export const DutchDateFormat = withState<DateTextInputState>({
  value: undefined
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    dateFormat={"dd-MM-yyyy"}
    placeholder={"DD-MM-YYYY"}
    value={store.state.value}
    onValueChange={value => store.set({ value })}
  />
));

DutchDateFormat.story = {
  name: "dutch date format"
};

export const Disabled = () => <DateTextInput value={""} disabled={true} />;

Disabled.story = {
  name: "disabled"
};

export const Invalid = () => (
  <DateTextInput value={"invalid input"} variant={"error"} />
);

Invalid.story = {
  name: "invalid"
};

export const WithNoIcon = withState<DateTextInputState>({
  value: undefined
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    value={store.state.value}
    onValueChange={value => store.set({ value })}
    hideCalenderIcon={true}
  />
));

WithNoIcon.story = {
  name: "with no icon"
};

export const WithDisabledCalendar = withState<DateTextInputState>({
  value: undefined
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    value={store.state.value}
    onValueChange={value => store.set({ value })}
    disableCalender={true}
  />
));

WithDisabledCalendar.story = {
  name: "with disabled calendar"
};

export const UsingPortal = withState<DateTextInputState>({
  value: undefined
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    value={store.state.value}
    onValueChange={value => store.set({ value })}
    portalTarget={document.body}
  />
));

UsingPortal.story = {
  name: "using portal"
};

export const CustomCalendarProps = withState<DateTextInputState>({
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
));

CustomCalendarProps.story = {
  name: "custom calendar props"
};
