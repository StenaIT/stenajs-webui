import { ComponentPropsWithoutRef, Ref, RefObject } from "react";

export interface InputProps<T = never>
  extends Omit<ComponentPropsWithoutRef<"input">, "value" | "onChange"> {
  /** This is a RefObject since the input components use ref.current which Ref type doesn't have. */
  inputRef?: RefObject<HTMLInputElement>;
  wrapperRef?: Ref<T>;
}

export interface TextAreaElementProps
  extends Omit<ComponentPropsWithoutRef<"textarea">, "value" | "onChange"> {
  /** This is a RefObject since the input components use ref.current which Ref type doesn't have. */
  inputRef?: RefObject<HTMLTextAreaElement>;
}

export type DivProps = ComponentPropsWithoutRef<"div">;

export type SpanProps = ComponentPropsWithoutRef<"span">;

export type H1Props = ComponentPropsWithoutRef<"h1">;

export type ButtonElementProps = ComponentPropsWithoutRef<"button">;

export type LabelElementProps = ComponentPropsWithoutRef<"label">;

export type InputElementProps = ComponentPropsWithoutRef<"input">;

export type AnchorElementProps = ComponentPropsWithoutRef<"a">;

export type SelectElementProps = ComponentPropsWithoutRef<"select">;

export interface WithInnerRef<TInputElement> {
  innerRef?: Ref<TInputElement>;
}
