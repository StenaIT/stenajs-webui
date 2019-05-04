import { Box, Omit, Space } from "@stenajs-webui/core";
import { UpDownButtons } from "@stenajs-webui/elements";
import * as React from "react";
import { useCallback } from "react";
import { StandardTextInput, StandardTextInputProps } from "./StandardTextInput";
import {
  defaultNumericTextInputTheme,
  NumericTextInputTheme
} from "./NumericTextInputTheme";

interface NumericTextInputProps
  extends Omit<StandardTextInputProps, "value" | "onChange" | "theme"> {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  max?: number;
  min?: number;
  step?: number;
  hideButtons?: boolean;
  theme?: NumericTextInputTheme;
}

export const NumericTextInput: React.FC<NumericTextInputProps> = ({
  value = 0,
  onChange,
  max,
  min,
  step = 1,
  contentRight,
  theme = defaultNumericTextInputTheme,
  disabled,
  ...restProps
}) => {
  const onClickDown = useCallback(() => {
    if (onChange) {
      const newValue = value - step;
      onChange(min != null ? Math.max(min, newValue) : newValue);
    }
  }, [value, onChange, max, min, step]);

  const onClickUp = useCallback(() => {
    if (onChange) {
      const newValue = value + step;
      onChange(max != null ? Math.min(max, newValue) : newValue);
    }
  }, [value, onChange, max, min, step]);

  const onChangeHandler = useCallback(
    value => {
      const n = parseIntOrFloat(value);
      if (n != null && !isNaN(n)) {
        onChange(n);
      }
    },
    [value, onChange, max, min, step]
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
      value={String(value)}
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
