import { Box, Omit, Space } from "@stenajs-webui/core";
import { UpDownButtons } from "@stenajs-webui/elements";
import * as React from "react";
import { useCallback } from "react";
import {
  StandardTextInput,
  StandardTextInputProps
} from "../StandardTextInput";
import {
  defaultNumericTextInputTheme,
  NumericTextInputTheme
} from "./NumericTextInputTheme";
import { parseFloatElseUndefined } from './util/NumericTextInputUtil';

export interface NumericTextInputProps
  extends Omit<
    StandardTextInputProps,
    "theme" | "onChange" // Omit onChange, since up down buttons don't generate HTMLInput event.
  > {
  max?: number;
  min?: number;
  step?: number;
  hideButtons?: boolean;
  theme?: NumericTextInputTheme;
}

export const NumericTextInput: React.FC<NumericTextInputProps> = ({
  value,
  onValueChange,
  max,
  min,
  step = 1,
  contentRight,
  theme = defaultNumericTextInputTheme,
  disabled,
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
          onValueChange(
            String(min != null ? Math.max(min, newValue) : newValue)
          );
        }
      }
    },
    [value, max, min, onValueChange]
  );

  const contentRightToUse = (
    <>
      {contentRight && (
        <>
          {contentRight}
          <Space />
        </>
      )}
      <Box borderLeft={`1px solid ${theme.borderColor}`}>
        <UpDownButtons
          onClickUp={disabled ? undefined : () => onClick(step)}
          onClickDown={disabled ? undefined : () => onClick(-step)}
          buttonHeight={theme.buttonHeight}
          iconColor={theme.textColor}
        />
      </Box>
    </>
  );

  console.log("value", value, typeof value);
  return (
    <StandardTextInput
      contentRight={contentRightToUse}
      value={value}
      onValueChange={onValueChange}
      disableContentPaddingRight
      inputType={"number"}
      min={min}
      max={max}
      step={step}
      {...restProps}
    />
  );
};

