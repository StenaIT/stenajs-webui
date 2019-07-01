import { RefObject } from "react";

export interface InputProps<T = any>
  extends Omit<JSX.IntrinsicElements["input"], "ref" | "value" | "onChange"> {
  /** Input ref to use. If omitted, an internal ref will be used. */
  inputRef?: RefObject<HTMLInputElement>;
  wrapperRef?: RefObject<T>;
}

export interface DivProps extends Omit<JSX.IntrinsicElements["div"], "ref"> {
  /** Input ref to use. If omitted, an internal ref will be used. */
  innerRef?: RefObject<HTMLInputElement>;
}

export interface SpanProps extends Omit<JSX.IntrinsicElements["span"], "ref"> {
  /** Input ref to use. If omitted, an internal ref will be used. */
  innerRef?: RefObject<HTMLInputElement>;
}

export interface ButtonProps extends Omit<JSX.IntrinsicElements["button"], "ref"> {
  /** Input ref to use. If omitted, an internal ref will be used. */
  innerRef?: RefObject<HTMLButtonElement>;
}

export interface WithInnerRef<TInputElement> {
  innerRef?: RefObject<TInputElement>;
}
