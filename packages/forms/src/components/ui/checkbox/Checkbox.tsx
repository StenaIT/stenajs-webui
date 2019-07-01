import styled from "@emotion/styled";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import {
  Box,
  Clickable,
  InputProps,
  useMouseIsOver,
  useThemeFields,
  WithInnerRef
} from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { FullOnChangeProps } from "../types";
import { CheckboxTheme, defaultCheckboxTheme } from "./CheckboxTheme";

export interface CheckboxProps
  extends FullOnChangeProps<boolean, ChangeEvent<HTMLInputElement>>,
    InputProps,
    WithInnerRef<HTMLButtonElement> {
  disabled?: boolean;
  indeterminate?: boolean;
  theme?: CheckboxTheme;
}

const InvisibleCheckbox = styled.input`
  top: 0;
  left: 0;
  width: 26px;
  cursor: inherit;
  height: 26px;
  margin: 0;
  opacity: 0;
  padding: 0;
  position: absolute;
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  disabled = false,
  inputRef,
  innerRef,
  indeterminate = false,
  onChange,
  onValueChange,
  theme = defaultCheckboxTheme,
  value = false,
  name
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        iconColorDisabled: theme.iconColorDisabled,
        iconColorChecked: theme.iconColorChecked,
        iconColorNotChecked: theme.iconColorNotChecked,
        iconColorNotCheckedHover: theme.iconColorNotCheckedHover,
        backgroundColorNotChecked: theme.backgroundColorNotChecked,
        backgroundColorNotCheckedHover: theme.backgroundColorNotCheckedHover,
        backgroundColorDisabled: theme.backgroundColorDisabled,
        backgroundColorChecked: theme.backgroundColorChecked,
        borderColorChecked: theme.borderColorChecked,
        borderColorNotChecked: theme.borderColorNotChecked,
        borderColorNotCheckedHover: theme.borderColorNotCheckedHover,
        borderColorDisabled: theme.borderColorDisabled
      }
    },
    [theme]
  );

  const innerInputRef = useRef(null);

  const innerRefToUse = inputRef || innerInputRef;

  const mouseIsOver = useMouseIsOver(innerRefToUse);

  const icon = getIcon(value, disabled, indeterminate, mouseIsOver, theme);

  const onClick = useCallback(
    ev => {
      if (onChange) {
        onChange(ev);
      }
      if (onValueChange) {
        onValueChange(!value);
      }
    },
    [onChange, onValueChange, value]
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
    [disabled, onChange]
  );

  useEffect(() => {
    if (innerRefToUse.current) {
      innerRefToUse.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate, innerRefToUse]);

  return (
    <Clickable onClick={disabled ? undefined : onClick} ref={innerRef}>
      <Box
        borderColor={getBorderColor(
          value,
          disabled,
          indeterminate,
          mouseIsOver,
          colors
        )}
        borderStyle={"solid"}
        borderWidth={"1px"}
        overflow={"hidden"}
        borderRadius={theme.borderRadius}
      >
        <Box
          width={theme.width}
          height={theme.height}
          background={getBackgroundColor(
            value,
            disabled,
            indeterminate,
            mouseIsOver,
            colors
          )}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {icon && (
            <Icon
              icon={icon}
              color={getIconColor(
                value,
                disabled,
                indeterminate,
                mouseIsOver,
                colors
              )}
              size={theme.iconSize}
            />
          )}
        </Box>
      </Box>
      <InvisibleCheckbox
        disabled={disabled}
        checked={value}
        ref={innerRefToUse}
        onChange={handleInputChange}
        type={"checkbox"}
        name={name}
        className={className}
      />
    </Clickable>
  );
};

interface IconColors {
  iconColorDisabled: string;
  iconColorChecked: string;
  iconColorNotChecked: string;
  iconColorNotCheckedHover: string;
  backgroundColorNotChecked: string;
  backgroundColorNotCheckedHover: string;
  backgroundColorDisabled: string;
  backgroundColorChecked: string;
  borderColorChecked: string;
  borderColorNotChecked: string;
  borderColorNotCheckedHover: string;
  borderColorDisabled: string;
}

const getIconColor = (
  value: boolean,
  disabled: boolean,
  indeterminate: boolean,
  mouseIsOver: boolean,
  colors: IconColors
): string => {
  if (disabled) {
    return colors.iconColorDisabled;
  } else if (value || indeterminate) {
    return colors.iconColorChecked;
  } else {
    if (mouseIsOver) {
      return colors.iconColorNotCheckedHover;
    }
    return colors.iconColorNotChecked;
  }
};

const getBorderColor = (
  value: boolean,
  disabled: boolean,
  indeterminate: boolean,
  mouseIsOver: boolean,
  colors: IconColors
): string => {
  if (disabled) {
    return colors.borderColorDisabled;
  } else if (value || indeterminate) {
    return colors.borderColorChecked;
  } else {
    if (mouseIsOver) {
      return colors.borderColorNotCheckedHover;
    }
    return colors.borderColorNotChecked;
  }
};

const getBackgroundColor = (
  value: boolean,
  disabled: boolean,
  indeterminate: boolean,
  mouseIsOver: boolean,
  colors: IconColors
): string => {
  if (disabled) {
    return colors.backgroundColorDisabled;
  } else if (value || indeterminate) {
    return colors.backgroundColorChecked;
  } else {
    if (mouseIsOver) {
      return colors.backgroundColorNotCheckedHover;
    }
    return colors.backgroundColorNotChecked;
  }
};

const getIcon = (
  value: boolean,
  disabled: boolean,
  indeterminate: boolean,
  mouseIsOver: boolean,
  theme: CheckboxTheme
): IconDefinition | undefined => {
  if (!value && !disabled && mouseIsOver) {
    return theme.checkIcon;
  }
  if (indeterminate) {
    return faMinus;
  }
  if (value) {
    return theme.checkIcon;
  }
  return undefined;
};
