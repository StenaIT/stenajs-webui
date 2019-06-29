import { Ref } from "react";
import { Omit } from "./Omit";

export interface InputProps
  extends Omit<JSX.IntrinsicElements["input"], "ref" | "value" | "onChange"> {
  inputRef?: Ref<HTMLInputElement>;
  innerRef?: Ref<HTMLDivElement>;
}

export interface DivProps extends Omit<JSX.IntrinsicElements["div"], "ref"> {
  innerRef?: Ref<HTMLDivElement>;
}

export interface SpanProps extends Omit<JSX.IntrinsicElements["span"], "ref"> {
  innerRef?: Ref<HTMLDivElement>;
}
