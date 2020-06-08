import * as React from "react";
import { ChangeEvent, ChangeEventHandler, useCallback } from "react";
import { TextAreaElementProps } from "@stenajs-webui/core";
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
  extends TextAreaElementProps,
    FullOnChangeProps<string, ChangeEvent<HTMLTextAreaElement>> {
  resize?: Resize;
  readOnly?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  className,
  value,
  onValueChange,
  onChange,
  resize = "none",
  ...textAreaProps
}) => {
  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    ev => {
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
      className={cx(className, styles.textArea)}
      style={{ resize }}
      onChange={onChangeHandler}
      {...textAreaProps}
    >
      {value}
    </textarea>
  );
};
