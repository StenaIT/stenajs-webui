import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Box,
  Clickable,
  Indent,
  Row,
  Space,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { ButtonTheme, defaultButtonTheme } from "./ButtonTheme";
import { useButtonContents } from "./hooks/UseButtonContents";

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
  leftIcon?: IconDefinition;
  /** FontAwesome icon to place to the right of the text. */
  rightIcon?: IconDefinition;
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
  /** The content to show when loading. */
  loadingLabel?: string;
  /** Render success check icon instead of button. */
  success?: boolean;
  /** The content to show on success. */
  successLabel?: string;
}

export interface ButtonTextProps {
  color: string;
  fontFamily: string;
  fontSize: string;
}

export const Button: React.FC<ButtonProps> = props => {
  const {
    onClick,
    width,
    disabled = false,
    loading = false,
    success = false,
    buttonTheme = defaultButtonTheme
  } = props;
  const { centerContent, leftContent, rightContent } = useButtonContents(props);

  const { colors } = useThemeFields(
    {
      colors: {
        bgColor: buttonTheme.bgColor,
        bgColorDisabled: buttonTheme.bgColorDisabled
      }
    },
    [buttonTheme]
  );
  return (
    <Clickable
      onClick={disabled || success || loading ? undefined : onClick}
      opacityOnHover
      disabled={disabled || success || loading}
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
          {leftContent || rightContent ? (
            <>
              {leftContent ? (
                <Indent num={buttonTheme.numSpacing}>{leftContent}</Indent>
              ) : (
                <Space num={buttonTheme.numSpacing} />
              )}
              {centerContent}
              {rightContent ? (
                <Indent num={buttonTheme.numSpacing}>{rightContent}</Indent>
              ) : (
                <Space num={buttonTheme.numSpacing} />
              )}
            </>
          ) : (
            <Indent num={buttonTheme.numSpacing * 2}>{centerContent}</Indent>
          )}
        </Row>
      </Box>
    </Clickable>
  );
};
