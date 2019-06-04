import { MutableRefObject } from "react";
import { Omit } from "./Omit";

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
