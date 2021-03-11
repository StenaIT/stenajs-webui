import { Omit, Space } from "@stenajs-webui/core";
import { UpDownButtons } from "@stenajs-webui/elements";
import * as React from "react";
import { useCallback } from "react";
import { TextInput, TextInputProps } from "../text-input/TextInput";
import { parseFloatElseUndefined } from "@stenajs-webui/core";
import styles from "./NumericTextInput.module.css";
import cx from "classnames";

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
      if (onValueChange) {
        if (!value) {
          onValueChange(String(numSteps));
        } else {
          const parsedValue = parseFloatElseUndefined(value);
          const newValue = (parsedValue || 0) + numSteps;
          onValueChange(String(limitWithinRange(newValue, min, max)));
        }
      }
    },
    [value, max, min, onValueChange]
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
      onValueChange={onValueChange}
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

const limitWithinRange = (
  value: number,
  min?: number,
  max?: number
): number => {
  let v = value;
  if (min != null) {
    v = Math.max(min, v);
  }
  if (max != null) {
    v = Math.min(max, v);
  }
  return v;
};
