import { ClassNames } from "@emotion/core";
import { Omit, Space } from "@stenajs-webui/core";
import { UpDownButtons } from "@stenajs-webui/elements";
import * as React from "react";
import { useCallback } from "react";
import { TextInput, TextInputProps } from "../TextInput";
import { parseFloatElseUndefined } from "./util/NumericTextInputUtil";

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
        buttonHeight={"100%"}
        iconColor={"var(--swui-textinput-text-color)"}
        disabled={disabled}
      />
    </>
  );

  return (
    <ClassNames>
      {({ css, cx }) => (
        <TextInput
          contentRight={contentRightToUse}
          value={value}
          onValueChange={onValueChange}
          disableContentPaddingRight={!hideButtons}
          type={"number"}
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
          disabled={disabled}
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
