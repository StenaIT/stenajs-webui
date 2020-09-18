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

Standard.storyName = "standard";

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

EnglishDateFormat.storyName = "english date format";

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

DutchDateFormat.storyName = "dutch date format";

export const Disabled = () => <DateTextInput value={""} disabled={true} />;

Disabled.storyName = "disabled";

export const Invalid = () => (
  <DateTextInput value={"invalid input"} variant={"error"} />
);

Invalid.storyName = "invalid";

export const WithNoIcon = withState<DateTextInputState>({
  value: undefined,
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
    hideCalenderIcon={true}
  />
));

WithNoIcon.storyName = "with no icon";

export const WithDisabledCalendar = withState<DateTextInputState>({
  value: undefined,
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
    disableCalender={true}
  />
));

WithDisabledCalendar.storyName = "with disabled calendar";

export const UsingPortal = withState<DateTextInputState>({
  value: undefined,
})(({ store }: { store: Store<DateTextInputState> }) => (
  <DateTextInput
    value={store.state.value}
    onValueChange={(value) => store.set({ value })}
    portalTarget={document.body}
  />
));

UsingPortal.storyName = "using portal";

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

CustomCalendarProps.storyName = "custom calendar props";
