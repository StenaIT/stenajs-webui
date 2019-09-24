import { Ref, RefObject } from "react";

export interface InputProps<T = any>
  extends Omit<JSX.IntrinsicElements["input"], "ref" | "value" | "onChange"> {
  /** Input ref to use. If omitted, an internal ref will be used. */
  inputRef?: RefObject<HTMLInputElement>; // This is a ref object, since the input components use ref.current which Ref type doesn't have.
  wrapperRef?: Ref<T>;
}

export interface DivProps extends Omit<JSX.IntrinsicElements["div"], "ref"> {
  /** Input ref to use. If omitted, an internal ref will be used. */
  innerRef?: Ref<HTMLDivElement>;
}

export interface SpanProps extends Omit<JSX.IntrinsicElements["span"], "ref"> {
  /** Input ref to use. If omitted, an internal ref will be used. */
  innerRef?: Ref<HTMLSpanElement>;
}

export interface ButtonProps
  extends Omit<JSX.IntrinsicElements["button"], "ref"> {
  /** Input ref to use. If omitted, an internal ref will be used. */
  innerRef?: Ref<HTMLButtonElement>;
}

export interface WithInnerRef<TInputElement> {
  innerRef?: Ref<TInputElement>;
}
