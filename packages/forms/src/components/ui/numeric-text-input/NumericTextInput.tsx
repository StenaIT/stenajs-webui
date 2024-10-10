import { Omit, Space } from "@stenajs-webui/core";
import { UpDownButtons } from "@stenajs-webui/elements";
import * as React from "react";
import { useCallback } from "react";
import { TextInput, TextInputProps } from "../text-input/TextInput";
import styles from "./NumericTextInput.module.css";
import cx from "classnames";
import {
  onStepValueChange,
  onTextValueChange,
} from "../../../utils/NumericHelpers";

export interface NumericTextInputProps
  extends Omit<
    TextInputProps,
    | "onChange" // Omit onChange, since up down buttons don't generate HTMLInput event.
    | "selectAllOnMount" // Not supported by browser when input type='number'
    | "moveCursorToEndOnMount" // Not supported by browser when input type='number'
  > {
  max?: number;
  min?: number;
  step?: number;
  hideButtons?: boolean;
}

/**
 * @deprecated Please use NumericStepper instead.
 * This is used internally, and should not be used by apps.
 */
export const NumericTextInput: React.FC<NumericTextInputProps> = ({
  value,
  onValueChange,
  max,
  min,
  step = 1,
  contentRight,
  disabled,
  className,
  hideButtons,
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

  const contentRightToUse = hideButtons ? (
    contentRight
  ) : (
    <>
      {contentRight && (
        <>
          {contentRight}
          <Space />
        </>
      )}
      <UpDownButtons
        onClickUp={disabled ? undefined : () => onClick(step)}
        onClickDown={disabled ? undefined : () => onClick(-step)}
        iconColor={"var(--swui-textinput-text-color)"}
        disabled={disabled}
      />
    </>
  );

  return (
    <TextInput
      contentRight={contentRightToUse}
      value={value}
      onValueChange={onChange}
      disableContentPaddingRight={!hideButtons}
      type={"number"}
      min={min}
      max={max}
      step={step}
      className={cx(styles.numericTextInputInput, className)}
      disabled={disabled}
      {...restProps}
    />
  );
};
