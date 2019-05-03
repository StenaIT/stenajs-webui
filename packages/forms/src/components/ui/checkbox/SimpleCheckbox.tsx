import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Clickable, InputProps, Row } from "@stenajs-webui/core";
import * as React from "react";
import { ChangeEvent, useCallback } from "react";
import { ValueOnChangeProps } from "../types";
import {
  defaultSimpleCheckboxTheme,
  SimpleCheckboxTheme
} from "./SimpleCheckboxTheme";

export interface SimpleCheckboxProps
  extends ValueOnChangeProps<boolean>,
    InputProps {
  disabled?: boolean;
  theme?: SimpleCheckboxTheme;
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
  theme: SimpleCheckboxTheme;
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

const StyledSimpleCheckboxWrapper = styled.div<{ theme: SimpleCheckboxTheme }>`
  height: ${({ theme }) => theme.height};
  position: relative;
  width: ${({ theme }) => theme.width};

  input:focus + div {
    border-color: ${({ theme }) => theme.borderColorFocused};
  }
`;

export const SimpleCheckbox: React.FC<SimpleCheckboxProps> = ({
  className,
  disabled,
  inputRef,
  onChange,
  theme = defaultSimpleCheckboxTheme,
  value
}) => {
  const onClick = useCallback(() => {
    if (onChange) {
      onChange(!value);
    }
  }, [onChange, value]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        if (onChange) {
          onChange(e.target.checked);
        }
      }
    },
    [disabled, onChange]
  );

  return (
    <StyledSimpleCheckboxWrapper
      className={className}
      ref={inputRef}
      theme={theme}
    >
      <Clickable onClick={disabled ? undefined : onClick}>
        <InvisibleInput
          disabled={disabled}
          checked={value}
          ref={inputRef}
          onChange={handleInputChange}
          type={"checkbox"}
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
                color={disabled ? theme.iconColorDisabled : theme.iconColor}
                style={{ fontSize: theme.iconSize }}
              />
            )}
          </Row>
        </Wrapper>
      </Clickable>
    </StyledSimpleCheckboxWrapper>
  );
};
