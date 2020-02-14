import * as React from "react";
import { ChangeEvent, useRef } from "react";
import { InputProps } from "@stenajs-webui/core";
import { useSelectAllOnFocus } from "../../../hooks/UseSelectAllOnFocus";
import { useSelectAllOnMount } from "../../../hooks/UseSelectAllOnMount";
import { FullOnChangeProps } from "../types";
import styles from "./TextInput.module.css";

export interface TextInputProps
  extends FullOnChangeProps<string, ChangeEvent<HTMLInputElement>>,
    InputProps {
  selectAllOnFocus?: boolean;
  selectAllOnMount?: boolean;
  moveCursorToEndOnMount?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  inputRef,
  onFocus,
  selectAllOnFocus,
  selectAllOnMount,
  moveCursorToEndOnMount,
  ...inputProps
}) => {
  const internalRef = useRef(null);
  const refToUse = inputRef || internalRef;

  const { onFocusHandler } = useSelectAllOnFocus(
    refToUse,
    onFocus,
    selectAllOnFocus
  );
  useSelectAllOnMount(refToUse, !!moveCursorToEndOnMount, !!selectAllOnMount);

  return (
    <input
      className={styles.textInput}
      type={"text"}
      ref={refToUse}
      onFocus={onFocusHandler}
      {...inputProps}
    />
  );
};
