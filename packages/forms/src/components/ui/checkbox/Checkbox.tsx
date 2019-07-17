import styled from "@emotion/styled";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  Box,
  InputProps,
  useMouseIsOver,
  useThemeFields
} from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { FullOnChangeProps } from "../types";
import { useId } from "../utils/UseId";
import { CheckboxTheme, defaultCheckboxTheme } from "./CheckboxTheme";

export interface CheckboxProps
  extends FullOnChangeProps<boolean, ChangeEvent<HTMLInputElement>>,
    InputProps<HTMLLabelElement> {
  disabled?: boolean;
  indeterminate?: boolean;
  id?: string;
  theme?: CheckboxTheme;
}

const InvisibleCheckbox = styled.input`
  top: 0;
  left: 0;
  cursor: inherit;
  margin: 0;
  opacity: 0;
  padding: 0;
  position: absolute;
`;

const CheckboxLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  input[type="checkbox"]:focus + & {
    box-shadow: 0 0 3pt 2pt rgba(0, 0, 100, 0.3);
  }
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  disabled = false,
  inputRef,
  indeterminate = false,
  onChange,
  onValueChange,
  id: outerId,
  theme = defaultCheckboxTheme,
  value = false,
  name
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        iconColorDisabled: theme.iconColorDisabled,
        iconColorChecked: theme.iconColorChecked,
        iconColorIndeterminate: theme.iconColorIndeterminate,
        iconColorNotChecked: theme.iconColorNotChecked,
        iconColorNotCheckedHover: theme.iconColorNotCheckedHover,
        backgroundColorNotChecked: theme.backgroundColorNotChecked,
        backgroundColorNotCheckedHover: theme.backgroundColorNotCheckedHover,
        backgroundColorDisabled: theme.backgroundColorDisabled,
        backgroundColorChecked: theme.backgroundColorChecked,
        backgroundColorIndeterminate: theme.backgroundColorIndeterminate,
        borderColorChecked: theme.borderColorChecked,
        borderColorIndeterminate: theme.borderColorIndeterminate,
        borderColorNotChecked: theme.borderColorNotChecked,
        borderColorNotCheckedHover: theme.borderColorNotCheckedHover,
        borderColorDisabled: theme.borderColorDisabled
      }
    },
    [theme]
  );
  const innerId = "swui-checkbox-" + useId();

  const id = outerId || innerId;

  const innerInputRef = useRef(null);

  const inputRefToUse = inputRef || innerInputRef;

  const mouseIsOver = useMouseIsOver(inputRefToUse);

  const icon = getIcon(value, disabled, indeterminate, mouseIsOver, theme);

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
    if (inputRefToUse.current) {
      inputRefToUse.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate, inputRefToUse]);

  return (
    <Box
      width={theme.width}
      height={theme.height}
      borderColor={getBorderColor(
        value,
        disabled,
        indeterminate,
        mouseIsOver,
        colors
      )}
      background={getBackgroundColor(
        value,
        disabled,
        indeterminate,
        mouseIsOver,
        colors
      )}
      borderStyle={"solid"}
      borderWidth={"1px"}
      position={"relative"}
      borderRadius={theme.borderRadius}
    >
      <InvisibleCheckbox
        disabled={disabled}
        checked={value}
        ref={inputRefToUse}
        onChange={handleInputChange}
        type={"checkbox"}
        name={name}
        id={id}
        className={className}
        style={{ width: "100%", height: "100%" }}
      />
      <CheckboxLabel
        style={{
          borderRadius: theme.borderRadius,
          width: "100%",
          height: "100%"
        }}
        htmlFor={id}
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
      </CheckboxLabel>
    </Box>
  );
};

interface IconColors {
  iconColorDisabled: string;
  iconColorChecked: string;
  iconColorIndeterminate: string;
  iconColorNotChecked: string;
  iconColorNotCheckedHover: string;
  backgroundColorNotChecked: string;
  backgroundColorNotCheckedHover: string;
  backgroundColorDisabled: string;
  backgroundColorChecked: string;
  backgroundColorIndeterminate: string;
  borderColorChecked: string;
  borderColorIndeterminate: string;
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
  } else if (indeterminate) {
    return colors.iconColorIndeterminate;
  } else if (value) {
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
  } else if (indeterminate) {
    return colors.borderColorIndeterminate;
  } else if (value) {
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
  } else if (indeterminate) {
    return colors.backgroundColorIndeterminate;
  } else if (value) {
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
    return theme.indeterminateIcon;
  }
  if (value) {
    return theme.checkIcon;
  }
  return undefined;
};
