import { ChangeEvent } from "react";

export type FullOnChangeProps<
  TValue,
  TEvent extends ChangeEvent
> = ValueProps<TValue> & OnChangeProps<TEvent> & OnValueChangeProps<TValue>;

export type ValueAndOnChangeProps<
  TValue,
  TEvent extends ChangeEvent
> = ValueProps<TValue> & OnChangeProps<TEvent>;

export type ValueAndOnValueChangeProps<TValue> = ValueProps<TValue> &
  OnValueChangeProps<TValue>;

interface ValueProps<TValue> {
  /** The value of the input. */
  value?: TValue;
}

interface OnChangeProps<TEvent extends ChangeEvent> {
  /** onChange callback, called when user triggers a value change. */
  onChange?: (event: TEvent) => void;
}

interface OnValueChangeProps<TValue> {
  /** onChange callback with target value, called when user triggers a value change in the field. */
  onValueChange?: (value: TValue) => void;
}
