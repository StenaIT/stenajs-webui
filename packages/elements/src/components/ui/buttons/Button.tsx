import styled from "@emotion/styled";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Clickable,
  Row,
  Space,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { Progress } from "../progress/Progress";
import { ButtonTheme, defaultButtonTheme } from "./ButtonTheme";

export interface ButtonProps {
  /** The theme to use.
   * @default defaultButtonTheme
   */
  buttonTheme?: ButtonTheme;
  /** The text on the button. */
  label?: string;
  /** React element to place to the left of the text. */
  left?: ReactNode;
  /** React element to place to the right of the text. */
  right?: ReactNode;
  /** FontAwesome icon to place to the left of the text. */
  leftIcon?: IconProp;
  /** FontAwesome icon to place to the right of the text. */
  rightIcon?: IconProp;
  /** The width of the button */
  width?: string;
  /** onClick callback, called when button is clicked. */
  onClick?: () => void;
  /** Disables the button. Changes to disabled color and clicks are disabled. */
  disabled?: boolean;
  /** The size of the icons */
  iconSize?: number;
  /** Render loading spinner instead of button. */
  loading?: boolean;
  /** The label to show when loading. */
  loadingLabel?: string;
  /** Render success check icon instead of button. */
  success?: boolean;
  /** The label to show on success. */
  successLabel?: string;
}

export interface ButtonTextProps {
  color: string;
  fontFamily: string;
  fontSize: string;
}

const ButtonText = styled.span<ButtonTextProps>`
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color }) => color};
  font-family: ${({ fontFamily }) => fontFamily};
  font-weight: 600;
  letter-spacing: 1px;
  margin-top: -2px;
`;

export const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  left,
  right,
  leftIcon,
  rightIcon,
  width,
  disabled = false,
  loading = false,
  success = false,
  iconSize = 14,
  successLabel,
  loadingLabel,
  buttonTheme = defaultButtonTheme
}) => {
  const { colors, fonts, fontSizes } = useThemeFields(
    {
      colors: {
        textColor: buttonTheme.textColor,
        textColorDisabled: buttonTheme.textColorDisabled,
        bgColor: buttonTheme.bgColor,
        bgColorDisabled: buttonTheme.bgColorDisabled,
        successIconColor: buttonTheme.successIconColor,
        progressSpinnerColor: buttonTheme.progressSpinnerColor
      },
      fontSizes: {
        fontSize: buttonTheme.fontSize
      },
      fonts: {
        font: buttonTheme.font
      }
    },
    [buttonTheme]
  );

  const showUserButton = !loading && !success;
  const labelToUse = success ? successLabel : loading ? loadingLabel : label;

  return (
    <Clickable
      onClick={disabled ? undefined : onClick}
      opacityOnHover
      disabled={disabled}
    >
      <Box
        borderRadius={buttonTheme.borderRadius}
        borderWidth={0}
        overflow={"hidden"}
        background={disabled ? colors.bgColorDisabled : colors.bgColor}
        height={buttonTheme.height}
      >
        <Row
          width={width}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Space num={buttonTheme.numSpacing} />
          {showUserButton && (leftIcon || left) && (
            <>
              {leftIcon && (
                <FontAwesomeIcon
                  icon={leftIcon}
                  color={colors.textColor}
                  style={{ fontSize: iconSize }}
                />
              )}
              {left}
              {label && <Space num={2} />}
            </>
          )}

          {success && (
            <FontAwesomeIcon
              icon={faCheck}
              color={colors.successIconColor}
              style={{ fontSize: 20 }}
            />
          )}

          {loading && (
            <Progress size={"24px"} trackColor={colors.progressSpinnerColor} />
          )}

          {(success || loading) && labelToUse && <Space num={2} />}

          {labelToUse && (
            <ButtonText
              color={disabled ? colors.textColorDisabled : colors.textColor}
              fontSize={fontSizes.fontSize}
              fontFamily={fonts.font}
            >
              {labelToUse}
            </ButtonText>
          )}

          {showUserButton && (right || rightIcon) && (
            <>
              {label && <Space num={2} />}
              {right}
              {rightIcon && (
                <FontAwesomeIcon
                  icon={rightIcon}
                  color={colors.textColor}
                  style={{ fontSize: iconSize }}
                />
              )}
            </>
          )}
          <Space num={buttonTheme.numSpacing} />
        </Row>
      </Box>
    </Clickable>
  );
};
