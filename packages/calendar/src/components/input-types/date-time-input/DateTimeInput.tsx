import { TextInput, TextInputProps } from "@stenajs-webui/forms";
import * as React from "react";

export interface DateTimeInputProps extends TextInputProps {}

export const DateTimeInput: React.FC<DateTimeInputProps> = (props) => (
  <TextInput type={"datetime-local"} {...props} />
);
