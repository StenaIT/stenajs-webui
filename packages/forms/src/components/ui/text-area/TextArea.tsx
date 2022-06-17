import * as React from "react";
import {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
} from "react";
import cx from "classnames";
import styles from "./TextArea.module.css";
import { FullOnChangeProps } from "../types";

type Resize =
  | "none"
  | "both"
  | "horizontal"
  | "vertical"
  | "inherit"
  | "initial"
  | "revert"
  | "unset";

export interface TextAreaProps
  extends Omit<ComponentPropsWithoutRef<"textarea">, "value">,
    FullOnChangeProps<string, ChangeEvent<HTMLTextAreaElement>> {
  resize?: Resize;
  readOnly?: boolean;
  rows?: number;
  disabled?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      value,
      onValueChange,
      onChange,
      resize = "none",
      readOnly = false,
      rows,
      disabled,
      ...textAreaProps
    },
    ref
  ) => {
    const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
      (ev) => {
        if (onChange) {
          onChange(ev);
        }
        if (onValueChange) {
          onValueChange(ev.target.value);
        }
      },
      [onChange, onValueChange]
    );

    return (
      <textarea
        disabled={disabled}
        rows={rows}
        readOnly={readOnly}
        className={cx(styles.textArea, className)}
        style={{ resize }}
        onChange={onChangeHandler}
        value={value}
        ref={ref}
        {...textAreaProps}
      />
    );
  }
);
