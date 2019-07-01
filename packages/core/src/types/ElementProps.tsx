import { RefObject } from "react";
import { Omit } from "./Omit";

export interface InputProps
  extends Omit<JSX.IntrinsicElements["input"], "ref" | "value" | "onChange"> {
  inputRef?: RefObject<HTMLInputElement>;
  innerRef?: RefObject<HTMLDivElement>;
}

export interface DivProps extends Omit<JSX.IntrinsicElements["div"], "ref"> {
  innerRef?: RefObject<HTMLDivElement>;
}

export interface SpanProps extends Omit<JSX.IntrinsicElements["span"], "ref"> {
  innerRef?: RefObject<HTMLSpanElement>;
}
