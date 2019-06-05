import { ClassNames } from "@emotion/core";
import { Box, Omit, Space } from "@stenajs-webui/core";
import { UpDownButtons } from "@stenajs-webui/elements";
import * as React from "react";
import { useCallback } from "react";
import { useThemeFields } from "../../../../../../core/src/theme/hooks/UseThemeSelector";
import {
  StandardTextInput,
  StandardTextInputProps
} from "../StandardTextInput";
import {
  defaultNumericTextInputTheme,
  NumericTextInputTheme
} from "./NumericTextInputTheme";
import { parseFloatElseUndefined } from "./util/NumericTextInputUtil";

export interface NumericTextInputProps
  extends Omit<
    StandardTextInputProps,
    | "theme"
    | "onChange" // Omit onChange, since up down buttons don't generate HTMLInput event.
    | "selectAllOnMount" // Not supported by browser when input type='number'
    | "moveCursorToEndOnMount" // Not supported by browser when input type='number'
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
  className,
  hideButtons,
  ...restProps
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        textColor: theme.textColor
      }
    },
    [theme]
  );
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
          iconColor={colors.textColor}
        />
      </Box>
    </>
  );

  return (
    <ClassNames>
      {({ css, cx }) => (
        <StandardTextInput
          contentRight={!hideButtons && contentRightToUse}
          value={value}
          onValueChange={onValueChange}
          disableContentPaddingRight
          inputType={"number"}
          min={min}
          max={max}
          step={step}
          className={cx([
            className,
            css`
              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                -moz-appearance: textfield;
                margin: 0;
              }
            `
          ])}
          theme={theme}
          {...restProps}
        />
      )}
    </ClassNames>
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
