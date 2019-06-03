import { Box, Omit, Space } from "@stenajs-webui/core";
import { UpDownButtons } from "@stenajs-webui/elements";
import * as React from "react";
import { useCallback } from "react";
import {
  defaultNumericTextInputTheme,
  NumericTextInputTheme
} from "./NumericTextInputTheme";
import { StandardTextInput, StandardTextInputProps } from "./StandardTextInput";

interface NumericTextInputProps
  extends Omit<
    StandardTextInputProps<number | undefined>,
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
  const onClickDown = useCallback(() => {
    if (onValueChange) {
      const newValue = (value || 0) - step;
      onValueChange(min != null ? Math.max(min, newValue) : newValue);
    }
  }, [value, max, min, step, onValueChange]);

  const onClickUp = useCallback(() => {
    if (onValueChange) {
      const newValue = (value || 0) + step;
      onValueChange(max != null ? Math.min(max, newValue) : newValue);
    }
  }, [value, max, min, step, onValueChange]);

  const onChangeHandler = useCallback(
    ev => {
      if (onValueChange) {
        if (!ev.target.value) {
          onValueChange(undefined);
        } else {
          const n = parseIntOrFloat(ev.target.value);
          if (n != null && !isNaN(n)) {
            onValueChange(n);
          }
        }
      }
    },
    [value, onValueChange, max, min, step]
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
          onClickUp={disabled ? undefined : onClickUp}
          onClickDown={disabled ? undefined : onClickDown}
          buttonHeight={theme.buttonHeight}
          iconColor={theme.textColor}
        />
      </Box>
    </>
  );

  return (
    <StandardTextInput
      contentRight={contentRightToUse}
      value={value === undefined ? "" : String(value)}
      onChange={onChangeHandler}
      disableContentPaddingRight
      inputType={"number"}
      min={min}
      max={max}
      step={step}
      {...restProps}
    />
  );
};

const parseIntOrFloat = (s: string): number =>
  hasDecimal(s) ? parseFloat(s) : parseInt(s, 10);

const hasDecimal = (s: string): boolean =>
  s.indexOf(".") >= 0 || s.indexOf(",") >= 0;
