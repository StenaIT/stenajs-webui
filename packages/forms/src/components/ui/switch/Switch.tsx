import styled from "@emotion/styled";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Omit } from "@stenajs-webui/core";
import * as React from "react";
import { Ref, useCallback } from "react";
import { ValueOnChangeProps } from "../types";
import { defaultSwitchTheme, SwitchTheme } from "./SwitchTheme";

type InputProps = JSX.IntrinsicElements["input"];

export interface SwitchProps
  extends Omit<InputProps, "value" | "onChange">,
    ValueOnChangeProps<boolean> {
  innerRef?: Ref<HTMLInputElement>;
  inputRef?: Ref<HTMLInputElement>;
  disabled?: boolean;
  onChange: (value: boolean) => void;
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

const Back = styled("div")<Pick<SwitchProps, "value" | "disabled" | "theme">>`
  cursor: ${({ disabled }) => (disabled ? "inherit" : "pointer")};
  width: ${({ theme }) => theme.width}px;
  height: ${({ theme }) => theme.height}px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ value, disabled, theme }) =>
    disabled
      ? theme.disabledColors.backgroundColor
      : value
      ? theme.checkedColors.backgroundColor
      : theme.colors.backgroundColor};
  position: relative;

  :hover {
    opacity: ${({ disabled }) => (disabled ? "1" : "0.7")};
  }
`;

const Front = styled("div")<Pick<SwitchProps, "disabled" | "theme" | "value">>`
  background-color: ${({ value, disabled, theme }) =>
    disabled
      ? theme.disabledColors.iconBackgroundColor
      : value
      ? theme.checkedColors.iconBackgroundColor
      : theme.colors.iconBackgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius - 1}px;
  height: ${({ theme }) => theme.height - 4}px;
  position: absolute;
  right ${({ value, theme }) =>
    value ? 2 : `${theme.width - theme.height + 2}`}px;
  top: 2px;
  transition: right 0.1s linear;
  width: ${({ theme }) => theme.height - 4}px; 
`;

const IconWrapper = styled("div")<Pick<SwitchProps, "theme" | "value">>`
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
  value,
  theme = defaultSwitchTheme
}) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange(e.target.checked);
      }
    },
    [disabled, onChange]
  );

  const handleSwitchClick = useCallback(() => {
    if (!disabled) {
      onChange(!value);
    }
  }, [disabled, onChange, value]);

  return (
    <div ref={innerRef}>
      <Back
        value={value}
        className={className}
        disabled={disabled}
        onClick={handleSwitchClick}
        theme={theme}
      >
        <InvisibleInput
          checked={value}
          onChange={handleInputChange}
          ref={inputRef}
          type={"checkbox"}
        />

        <Front value={value} disabled={disabled} theme={theme}>
          <IconWrapper theme={theme} value={value}>
            <div style={{ fontSize: theme.height - 8 }}>
              <FontAwesomeIcon
                color={
                  disabled
                    ? theme.iconColorDisabled
                    : value
                    ? theme.iconColorChecked
                    : theme.iconColor
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
