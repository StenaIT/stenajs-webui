import { Omit, Row, Space } from "@stenajs-webui/core";
import { FlatButton } from "@stenajs-webui/elements";
import * as React from "react";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import {
  NumericTextInput,
  NumericTextInputProps,
} from "../numeric-text-input/NumericTextInput";
import { useCallback } from "react";
import { isMaxReached, isMinReached } from "../../../utils/NumberComparator";
import {
  onStepValueChange,
  onTextValueChange,
} from "../../../utils/NumericHelpers";

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
      onStepValueChange({ onValueChange, value, numSteps, min, max });
    },
    [value, max, min, onValueChange]
  );
  const onChange = useCallback(
    (newValue: string) => {
      onTextValueChange({ onValueChange, newValue, min, max });
    },
    [max, min, onValueChange]
  );

  return (
    <Row role={"group"}>
      <FlatButton
        leftIcon={faMinus}
        aria-label={"Decrease"}
        disabled={disabled || isMinReached(value, min)}
        onClick={() => onClick(-step)}
      />
      <Space />
      <NumericTextInput
        hideButtons
        onValueChange={onChange}
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
        disabled={disabled || isMaxReached(value, max)}
        onClick={() => onClick(step)}
      />
    </Row>
  );
};
