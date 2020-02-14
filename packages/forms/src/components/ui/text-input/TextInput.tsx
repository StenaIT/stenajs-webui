import * as React from "react";
import { ChangeEvent } from "react";
import { InputProps } from "@stenajs-webui/core";
import { FullOnChangeProps } from "../types";
import styles from "./TextInput.module.css";

export interface TextInputProps
  extends FullOnChangeProps<string, ChangeEvent<HTMLInputElement>>,
    InputProps {}

export const TextInput: React.FC<TextInputProps> = ({ ...inputProps }) => {
  return <input className={styles.textInput} type={"text"} {...inputProps} />;
};
