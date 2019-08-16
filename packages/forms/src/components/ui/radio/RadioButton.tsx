import styled from "@emotion/styled";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Clickable,
  InputProps,
  useMouseIsOver,
  useThemeFields
} from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";
import { ChangeEvent, useCallback, useRef } from "react";
import { FullOnChangeProps } from "../types";
import { defaultRadioButtonTheme, RadioButtonTheme } from "./RadioButtonTheme";

export interface RadioButtonProps
  extends FullOnChangeProps<boolean, ChangeEvent<HTMLInputElement>>,
    InputProps<HTMLButtonElement> {
  disabled?: boolean;
  theme?: RadioButtonTheme;
}

const InvisibleRadioButton = styled.input`
  top: 0;
  left: 0;
  width: 100%;
  cursor: inherit;
  height: 100%;
  margin: 0;
  opacity: 0;
  padding: 0;
  position: absolute;
`;

export const RadioButton: React.FC<RadioButtonProps> = ({
  className,
  disabled = false,
  onChange,
  onValueChange,
  theme = defaultRadioButtonTheme,
  value = false,
  inputRef,
  name,
  wrapperRef
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        iconColorDisabled: theme.iconColorDisabled,
        iconColor: theme.iconColor,
        iconColorNotChecked: theme.iconColorNotChecked,
        iconColorNotCheckedHover: theme.iconColorNotCheckedHover
      }
    },
    [theme]
  );

  const innerInputRef = useRef(null);

  const inputRefToUse = inputRef || innerInputRef;

  const mouseIsOver = useMouseIsOver(inputRefToUse);

  const icon = getIcon(value, disabled, mouseIsOver, theme);

  const onClickHandler = useCallback(
    ev => {
      if (onChange) {
        onChange(ev);
      }
      if (onValueChange) {
        onValueChange(true);
      }
    },
    [onChange, onValueChange]
  );

  const handleInputChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        if (onChange) {
          onChange(ev);
        }
        if (onValueChange) {
          onValueChange(ev.target.checked);
        }
      }
    },
    [disabled, onChange, onValueChange]
  );

  return (
    <Clickable
      onClick={disabled ? undefined : onClickHandler}
      innerRef={wrapperRef}
    >
      <Icon
        color={getIconColor(value, disabled, mouseIsOver, colors)}
        icon={icon}
        hoverColor={"red"}
        size={theme.iconSize}
      />
      <InvisibleRadioButton
        disabled={disabled}
        checked={value}
        ref={inputRefToUse}
        onChange={handleInputChange}
        type={"radio"}
        name={name}
        className={className}
      />
    </Clickable>
  );
};

interface IconColors {
  iconColorDisabled: string;
  iconColor: string;
  iconColorNotChecked: string;
  iconColorNotCheckedHover: string;
}

const getIconColor = (
  value: boolean,
  disabled: boolean,
  mouseIsOver: boolean,
  colors: IconColors
): string => {
  if (disabled) {
    return colors.iconColorDisabled;
  } else if (value) {
    return colors.iconColor;
  } else {
    if (mouseIsOver) {
      return colors.iconColorNotCheckedHover;
    }
    return colors.iconColorNotChecked;
  }
};

const getIcon = (
  value: boolean,
  disabled: boolean,
  mouseIsOver: boolean,
  theme: RadioButtonTheme
): IconDefinition => {
  if (!value && !disabled && mouseIsOver) {
    return theme.iconNotCheckedHover;
  }
  if (value) {
    if (disabled) {
      return theme.iconCheckedDisabled;
    }
    return theme.iconChecked;
  } else {
    if (disabled) {
      return theme.iconNotCheckedDisabled;
    }
    return theme.iconNotChecked;
  }
};
