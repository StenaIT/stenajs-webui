import { MutableRefObject } from "react";

export interface InputProps
  extends Omit<JSX.IntrinsicElements["input"], "ref" | "value" | "onChange"> {
  /** Input ref to use. If omitted, an internal ref will be used. */
  inputRef?: MutableRefObject<HTMLInputElement>;
}

export interface DivProps extends Omit<JSX.IntrinsicElements["div"], "ref"> {
  /** Input ref to use. If omitted, an internal ref will be used. */
  innerRef?: MutableRefObject<HTMLInputElement>;
}

export interface SpanProps extends Omit<JSX.IntrinsicElements["span"], "ref"> {
  /** Input ref to use. If omitted, an internal ref will be used. */
  innerRef?: MutableRefObject<HTMLInputElement>;
}

export interface WithInnerRef<TInputElement> {
  innerRef?: MutableRefObject<TInputElement>;
}
