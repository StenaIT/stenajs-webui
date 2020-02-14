import { InputProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { ChangeEvent, useRef } from "react";
import { useTextInput } from "../../../hooks/UseTextInput";
import { FullOnChangeProps } from "../types";
import { MoveDirection } from "./SimpleTextInput";
import styles from "./TextInput.module.css";

export interface TextInputProps
  extends FullOnChangeProps<string, ChangeEvent<HTMLInputElement>>,
    InputProps {
  selectAllOnFocus?: boolean;
  selectAllOnMount?: boolean;
  moveCursorToEndOnMount?: boolean;
  onDone?: (value: string) => void;
  onEnter?: () => void;
  onEsc?: () => void;
  /** onMove callback, triggered when user tries to move outside of field using arrow keys, tab or shift+tab. */
  onMove?: (direction: MoveDirection) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  inputRef,
  className,
  ...inputProps
}) => {
  const internalRef = useRef(null);
  const refToUse = inputRef || internalRef;
  const hookProps = useTextInput(refToUse, inputProps);
  return (
    <input
      className={cx(className, styles.textInput)}
      type={"text"}
      ref={refToUse}
      {...hookProps}
      {...inputProps}
    />
  );
};
