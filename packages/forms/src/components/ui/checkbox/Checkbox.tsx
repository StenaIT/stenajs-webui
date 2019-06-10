import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Clickable,
  InputProps,
  Row,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";
import { ChangeEvent, useCallback } from "react";
import { FullOnChangeProps } from "../types";
import { CheckboxTheme, defaultCheckboxTheme } from "./CheckboxTheme";

export interface CheckboxProps
  extends FullOnChangeProps<boolean, ChangeEvent<HTMLInputElement>>,
    InputProps {
  disabled?: boolean;
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

const Wrapper = styled("div")<{
  disabled: boolean | undefined;
  theme: CheckboxTheme;
  value: boolean | undefined;
}>`
  background-color: ${({ disabled, theme, value }) =>
    disabled
      ? theme.backgroundColorDisabled
      : value
      ? theme.backgroundColorChecked
      : theme.backgroundColor};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.borderRadius};
  border-color: ${({ disabled, theme, value }) =>
    disabled
      ? theme.borderColorDisabled
      : value
      ? theme.borderColorChecked
      : theme.borderColor};
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

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  disabled,
  inputRef,
  onChange,
  onValueChange,
  theme = defaultCheckboxTheme,
  value,
  name
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
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

  return (
    <StyledCheckboxWrapper className={className} ref={inputRef} theme={theme}>
      <Clickable onClick={disabled ? undefined : onClick}>
        <InvisibleInput
          disabled={disabled}
          checked={value}
          ref={inputRef}
          onChange={handleInputChange}
          type={"checkbox"}
          name={name}
        />
        <Wrapper disabled={disabled} theme={theme} value={value}>
          <Row
            justifyContent={"center"}
            alignItems={"center"}
            width={theme.width}
            height={theme.height}
          >
            {value && (
              <FontAwesomeIcon
                icon={theme.checkIcon}
                color={disabled ? colors.iconColorDisabled : colors.iconColor}
                style={{ fontSize: theme.iconSize }}
              />
            )}
          </Row>
        </Wrapper>
      </Clickable>
    </StyledCheckboxWrapper>
  );
};
