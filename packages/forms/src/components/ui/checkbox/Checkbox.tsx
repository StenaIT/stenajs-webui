import styled from "@emotion/styled";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import {
  Clickable,
  InputProps,
  Row,
  useThemeFields
} from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { FullOnChangeProps } from "../types";
import { CheckboxTheme, defaultCheckboxTheme } from "./CheckboxTheme";

export interface CheckboxProps
  extends FullOnChangeProps<boolean, ChangeEvent<HTMLInputElement>>,
    InputProps {
  disabled?: boolean;
  indeterminate?: boolean;
  theme?: CheckboxTheme;
}

const InvisibleInput = styled.input`
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

interface WrapperProps {
  disabled: boolean | undefined;
  value: boolean | undefined;
  indeterminate: boolean | undefined;
  themeFields: ThemeFields;
  theme?: CheckboxTheme;
}

const resolveBackgroundColor = ({
  disabled,
  indeterminate,
  themeFields,
  value
}: WrapperProps) => {
  if (disabled) {
    return themeFields.colors.backgroundColorDisabled;
  } else if (value || indeterminate) {
    return themeFields.colors.backgroundColorChecked;
  } else {
    return themeFields.colors.backgroundColor;
  }
};

const resolveBorderColor = ({
  disabled,
  indeterminate,
  themeFields,
  value
}: WrapperProps) => {
  if (disabled) {
    return themeFields.colors.borderColorDisabled;
  } else if (value || indeterminate) {
    return themeFields.colors.borderColorChecked;
  } else {
    return themeFields.colors.borderColor;
  }
};

const resolveIconColor = ({
  disabled,
  indeterminate,
  themeFields,
  value
}: WrapperProps) => {
  if (disabled) {
    return themeFields.colors.iconColorDisabled;
  } else if (value || indeterminate) {
    return themeFields.colors.iconColor;
  } else {
    return themeFields.colors.iconColor;
  }
};

const Wrapper = styled("div")<WrapperProps>`
  background-color: ${props => resolveBackgroundColor(props)};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${props => resolveBorderColor(props)};
  overflow: hidden;
`;

const StyledCheckboxWrapper = styled.div<{ theme: CheckboxTheme }>`
  height: ${({ theme }) => theme.height};
  position: relative;
  width: ${({ theme }) => theme.width};

  input:focus + div {
    border-color: ${({ theme }) => theme.borderColorFocused};
  }
`;

type ThemeFields = {
  colors: {
    backgroundColor: string;
    backgroundColorChecked: string;
    backgroundColorDisabled: string;
    borderColor: string;
    borderColorChecked: string;
    borderColorDisabled: string;
    iconColorDisabled: string;
    iconColor: string;
  };
};

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  disabled,
  innerRef,
  inputRef,
  indeterminate,
  onChange,
  onValueChange,
  theme = defaultCheckboxTheme,
  value
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const themeFields = useThemeFields<ThemeFields>(
    {
      colors: {
        backgroundColor: theme.backgroundColor,
        backgroundColorChecked: theme.backgroundColorChecked,
        backgroundColorDisabled: theme.backgroundColorDisabled,
        borderColor: theme.borderColor,
        borderColorChecked: theme.borderColorChecked,
        borderColorDisabled: theme.borderColorDisabled,
        iconColorDisabled: theme.iconColorDisabled,
        iconColor: theme.iconColor
      }
    },
    [theme]
  );

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
    const checkboxRef = inputRef || ref;
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate, inputRef]);

  return (
    <StyledCheckboxWrapper className={className} ref={innerRef} theme={theme}>
      <Clickable onClick={disabled ? undefined : onClick}>
        <InvisibleInput
          disabled={disabled}
          checked={value}
          ref={inputRef || ref}
          onChange={handleInputChange}
          type={"checkbox"}
        />
        <Wrapper
          disabled={disabled}
          theme={theme}
          themeFields={themeFields}
          indeterminate={indeterminate}
          value={value}
        >
          <Row
            justifyContent={"center"}
            alignItems={"center"}
            width={theme.width}
            height={theme.height}
          >
            {(value || indeterminate) && (
              <Icon
                icon={indeterminate ? faMinus : theme.checkIcon}
                color={resolveIconColor({
                  disabled,
                  indeterminate,
                  theme,
                  themeFields,
                  value
                })}
                size={theme.iconSize}
              />
            )}
          </Row>
        </Wrapper>
      </Clickable>
    </StyledCheckboxWrapper>
  );
};
