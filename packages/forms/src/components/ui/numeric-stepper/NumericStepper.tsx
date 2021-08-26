import { Omit, Row, Space } from "@stenajs-webui/core";
import { FlatButton } from "@stenajs-webui/elements";
import * as React from "react";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import {
  changeValue,
  NumericTextInput,
  NumericTextInputProps,
} from "../numeric-text-input/NumericTextInput";
import { useCallback } from "react";

export interface NumericStepperProps
  extends Omit<NumericTextInputProps, "hideButtons"> {}

export const NumericStepper: React.FC<NumericStepperProps> = ({
  disabled,
  onValueChange,
  value,
  max,
  min,
  step = 1,
  ...restProps
}) => {
  const onClick = useCallback(
    (numSteps: number) => {
      changeValue({ onValueChange, value, numSteps, min, max });
    },
    [value, max, min, onValueChange]
  );

  return (
    <Row role={"group"}>
      <FlatButton
        leftIcon={faMinus}
        aria-label={"Decrease"}
        disabled={disabled}
        onClick={() => onClick(-step)}
      />
      <Space />
      <NumericTextInput
        hideButtons
        onValueChange={onValueChange}
        value={value}
        max={max}
        min={min}
        step={step}
        disabled={disabled}
        {...restProps}
      />
      <Space />
      <FlatButton
        leftIcon={faPlus}
        aria-label={"Increase"}
        disabled={disabled}
        onClick={() => onClick(step)}
      />
    </Row>
  );
};
