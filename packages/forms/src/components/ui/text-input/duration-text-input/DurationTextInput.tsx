import { Box, Row, SmallText, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import { useMemo } from "react";
import { stripAllButNumbers } from "../../../../utils/TimeStringHelper";
import { ValueAndOnValueChangeProps } from "../../types";
import { NumericTextInput } from "../numeric-text-input/NumericTextInput";
import {
  defaultNumericTextInputTheme,
  NumericTextInputTheme
} from "../numeric-text-input/NumericTextInputTheme";

export interface DurationTextInputValue {
  hours: string;
  minutes: string;
}

interface Props extends ValueAndOnValueChangeProps<DurationTextInputValue> {
  onEnter?: () => void;
  theme?: NumericTextInputTheme;
}

export const DurationTextInput: React.FC<Props> = ({
  value,
  onValueChange,
  theme = defaultNumericTextInputTheme,
  onEnter
}) => {
  const themeToUse = useMemo(() => {
    return {
      ...theme,
      borderWidth: 0
    };
  }, [theme]);

  const {
    colors: { borderColor, borderColorFocused }
  } = useThemeFields(
    {
      colors: {
        borderColor: themeToUse.borderColor,
        borderColorFocused: themeToUse.borderColorFocused
      }
    },
    [themeToUse]
  );

  const focusWithinBorder = useMemo(() => {
    return `${theme.borderWidth}px ${theme.borderStyle} ${borderColorFocused}`;
  }, [theme, borderColorFocused]);

  const border = useMemo(() => {
    return `${theme.borderWidth}px ${theme.borderStyle} ${borderColor}`;
  }, [theme, borderColor]);

  const hoursValue = value?.hours ?? "";
  const minutesValue = value?.minutes ?? "";

  return (
    <Row
      focusWithinBorder={focusWithinBorder}
      border={border}
      height={theme.height}
      borderRadius={theme.borderRadius}
      width={"fit-content"}
    >
      <Box width={"45px"}>
        <NumericTextInput
          theme={themeToUse}
          value={hoursValue}
          onValueChange={hours =>
            onValueChange &&
            onValueChange({
              minutes: minutesValue,
              hours: stripAllButNumbers(hours)
            })
          }
          contentRight={<SmallText color={"disabledText"}>h</SmallText>}
          placeholder={"12"}
          hideButtons
          onEnter={onEnter}
        />
      </Box>
      <Box width={"58px"}>
        <NumericTextInput
          theme={themeToUse}
          value={minutesValue}
          onValueChange={minutes =>
            onValueChange &&
            onValueChange({
              minutes: stripAllButNumbers(minutes),
              hours: hoursValue
            })
          }
          contentRight={<SmallText color={"disabledText"}>min</SmallText>}
          placeholder={"30"}
          hideButtons
          onEnter={onEnter}
        />
      </Box>
    </Row>
  );
};
