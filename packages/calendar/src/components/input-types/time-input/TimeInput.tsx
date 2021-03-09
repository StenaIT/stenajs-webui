import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { TextInput, TextInputProps } from "@stenajs-webui/forms";
import * as React from "react";

export interface TimeInputProps extends TextInputProps {}

export const TimeInput: React.FC<TimeInputProps> = (props) => (
  <TextInput iconLeft={faClock} type={"time"} {...props} />
);
