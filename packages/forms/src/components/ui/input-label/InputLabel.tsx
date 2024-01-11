import * as React from "react";
import { InputLabelText } from "./InputLabelText";
import { ScreenReaderOnlyText } from "@stenajs-webui/core";

export interface InputLabelProps {
  htmlFor?: string;
  label?: string;
  screenReaderLabel?: string;
  className?: string;
  disabled?: boolean;
}

export const InputLabel: React.FC<InputLabelProps> = ({
  htmlFor,
  screenReaderLabel,
  label,
  disabled,
  className,
}) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {screenReaderLabel ? (
        <ScreenReaderOnlyText>{screenReaderLabel}</ScreenReaderOnlyText>
      ) : null}
      <InputLabelText
        aria-hidden={Boolean(screenReaderLabel)}
        text={label}
        disabled={disabled}
      />
    </label>
  );
};
