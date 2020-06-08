import { Ref, RefObject } from "react";

export interface InputProps<T = any>
  extends Omit<JSX.IntrinsicElements["input"], "ref" | "value" | "onChange"> {
  /** This is a RefObject since the input components use ref.current which Ref type doesn't have. */
  inputRef?: RefObject<HTMLInputElement>;
  wrapperRef?: Ref<T>;
}

export interface TextAreaElementProps
  extends Omit<
    JSX.IntrinsicElements["textarea"],
    "ref" | "value" | "onChange"
  > {
  /** This is a RefObject since the input components use ref.current which Ref type doesn't have. */
  inputRef?: RefObject<HTMLTextAreaElement>;
}

export interface DivProps extends Omit<JSX.IntrinsicElements["div"], "ref"> {
  innerRef?: Ref<HTMLDivElement>;
}

export interface SpanProps extends Omit<JSX.IntrinsicElements["span"], "ref"> {
  innerRef?: Ref<HTMLSpanElement>;
}

export interface ButtonProps
  extends Omit<JSX.IntrinsicElements["button"], "ref"> {
  innerRef?: Ref<HTMLButtonElement>;
}

export interface WithInnerRef<TInputElement> {
  innerRef?: Ref<TInputElement>;
}
