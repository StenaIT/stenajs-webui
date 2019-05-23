import styled from "@emotion/styled";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputProps, Omit, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import { ChangeEvent, Ref, useCallback } from "react";
import { FullOnChangeProps } from "../types";
import { defaultSwitchTheme, SwitchTheme } from "./SwitchTheme";

export interface SwitchProps
  extends Omit<InputProps, "value" | "onChange">,
    FullOnChangeProps<boolean, ChangeEvent<HTMLInputElement>> {
  innerRef?: Ref<HTMLInputElement>;
  inputRef?: Ref<HTMLInputElement>;
  disabled?: boolean;
  theme?: SwitchTheme;
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

interface WithThemeFields {
  themeFields: {
    colors: {
      backgroundColorChecked: string;
      backgroundColor: string;
      backgroundColorDisabled: string;
      iconBackgroundColor: string;
      iconBackgroundColorDisabled: string;
      iconBackgroundColorChecked: string;
    };
  };
}

const Back = styled("div")<
  Required<Pick<SwitchProps, "value" | "disabled" | "theme">> & WithThemeFields
>`
  cursor: ${({ disabled }) => (disabled ? "inherit" : "pointer")};
  width: ${({ theme }) => theme.width}px;
  height: ${({ theme }) => theme.height}px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ value, disabled, themeFields }) =>
    disabled
      ? themeFields.colors.backgroundColorDisabled
      : value
      ? themeFields.colors.backgroundColorChecked
      : themeFields.colors.backgroundColor};
  position: relative;

  :hover {
    opacity: ${({ disabled }) => (disabled ? "1" : "0.7")};
  }
`;

const Front = styled("div")<
  Required<Pick<SwitchProps, "disabled" | "value" | "theme">> & WithThemeFields
>`
  background-color: ${({ value, disabled, themeFields }) =>
    disabled
      ? themeFields.colors.iconBackgroundColorDisabled
      : value
      ? themeFields.colors.iconBackgroundColorChecked
      : themeFields.colors.iconBackgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius - 1}px;
  height: ${({ theme }) => theme.height - 4}px;
  position: absolute;
  right ${({ value, theme }) =>
    value ? 2 : `${theme.width - theme.height + 2}`}px;
  top: 2px;
  transition: right 0.1s linear;
  width: ${({ theme }) => theme.height - 4}px; 
`;

const IconWrapper = styled("div")<
  Required<Pick<SwitchProps, "value" | "theme">>
>`
  align-items: center;
  display: flex;
  height: ${({ theme }) => theme.height - 4}px;
  justify-content: center;
  width: ${({ theme }) => theme.height - 4}px;
  opacity: ${({ value }) => (value ? 1 : 0)};
  transition: opacity 0.1s linear;
`;

export const Switch: React.FC<SwitchProps> = ({
  className,
  disabled = false,
  inputRef,
  innerRef,
  onChange,
  onValueChange,
  value = false,
  theme = defaultSwitchTheme
}) => {
  const themeFields = useThemeFields(
    {
      colors: {
        backgroundColorChecked: theme.backgroundColorChecked,
        backgroundColor: theme.backgroundColor,
        backgroundColorDisabled: theme.backgroundColorDisabled,
        iconBackgroundColor: theme.iconBackgroundColor,
        iconBackgroundColorDisabled: theme.iconBackgroundColorDisabled,
        iconBackgroundColorChecked: theme.iconBackgroundColorChecked,
        iconColorDisabled: theme.iconColorDisabled,
        iconColorChecked: theme.iconColorChecked,
        iconColor: theme.iconColor
      }
    },
    [theme]
  );

  const inputChangeHandler = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        if (onValueChange) {
          onValueChange(ev.target.checked);
        }
        if (onChange) {
          onChange(ev);
        }
      }
    },
    [disabled, onChange, onValueChange]
  );

  const switchClickHandler = useCallback(
    ev => {
      if (!disabled) {
        if (onValueChange) {
          onValueChange(!value);
        }
        if (onChange) {
          onChange(ev);
        }
      }
    },
    [disabled, onChange, onValueChange, value]
  );

  return (
    <div ref={innerRef}>
      <Back
        value={value}
        className={className}
        disabled={disabled}
        onClick={switchClickHandler}
        theme={theme}
        themeFields={themeFields}
      >
        <InvisibleInput
          checked={value}
          onChange={inputChangeHandler}
          ref={inputRef}
          type={"checkbox"}
        />

        <Front
          value={value}
          disabled={disabled}
          theme={theme}
          themeFields={themeFields}
        >
          <IconWrapper theme={theme} value={value}>
            <div style={{ fontSize: theme.height - 8 }}>
              <FontAwesomeIcon
                color={
                  disabled
                    ? themeFields.colors.iconColorDisabled
                    : value
                    ? themeFields.colors.iconColorChecked
                    : themeFields.colors.iconColor
                }
                icon={faCheck}
              />
            </div>
          </IconWrapper>
        </Front>
      </Back>
    </div>
  );
};
