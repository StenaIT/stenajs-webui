import styled from "@emotion/styled";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Clickable, Row, Space } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { Progress } from "../progress/Progress";
import { ButtonTheme, defaultButtonTheme } from "./ButtonTheme";
import { useButtonStateTheme } from "./hooks/UseBottonStateTheme";

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

export const Button: React.FC<ButtonProps> = React.memo(props => {
  const {
    onClick,
    width,
    disabled = false,
    loading = false,
    loadingLabel,
    success = false,
    successLabel,
    buttonTheme = defaultButtonTheme,
    iconSize = 14,
    left,
    leftIcon,
    label,
    right,
    rightIcon
  } = props;
  const {
    textColor,
    bgColor,
    successIconColor,
    successTextColor,
    loadingSpinnerColor,
    loadingTextColor,
    font,
    fontSize
  } = useButtonStateTheme(buttonTheme, disabled);

  const list = [];

  if (success) {
    list.push(
      <FontAwesomeIcon
        icon={faCheck}
        color={successIconColor}
        style={{ fontSize: buttonTheme.successIconSize }}
      />
    );
    if (successLabel) {
      list.push(
        <ButtonText
          color={successTextColor}
          fontSize={fontSize}
          fontFamily={font}
        >
          {successLabel}
        </ButtonText>
      );
    }
  } else if (loading) {
    list.push(
      <Progress
        size={buttonTheme.loadingSpinnerSize}
        trackColor={loadingSpinnerColor}
      />
    );
    if (loadingLabel) {
      list.push(
        <ButtonText
          color={loadingTextColor}
          fontSize={fontSize}
          fontFamily={font}
        >
          {loadingLabel}
        </ButtonText>
      );
    }
  } else {
    if (left || leftIcon) {
      list.push(
        <SideContent
          icon={leftIcon}
          customContent={left}
          iconSize={iconSize}
          iconColor={textColor}
        />
      );
    }
    if (label) {
      list.push(
        <ButtonText color={textColor} fontSize={fontSize} fontFamily={font}>
          {label}
        </ButtonText>
      );
    }
    if (right || rightIcon) {
      list.push(
        <SideContent
          icon={rightIcon}
          customContent={right}
          iconSize={iconSize}
          iconColor={textColor}
        />
      );
    }
  }

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
        background={bgColor}
        height={buttonTheme.height}
      >
        <Row
          width={width}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {list.length === 0 && <Space num={buttonTheme.numSpacing} />}
          {list.length === 1 && <Space num={buttonTheme.numSpacing} />}
          <Space num={buttonTheme.numSpacing} />
          {list.map(item => (
            <>
              {item}
              <Space num={buttonTheme.numSpacing} />
            </>
          ))}
          {list.length === 1 && <Space num={buttonTheme.numSpacing} />}
        </Row>
      </Box>
    </Clickable>
  );
});

const ButtonText = styled.span<ButtonTextProps>`
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color }) => color};
  font-family: ${({ fontFamily }) => fontFamily};
  font-weight: 600;
  letter-spacing: 1px;
  margin-top: -2px;
`;

interface SideContentProps {
  customContent?: ReactNode;
  icon?: IconDefinition;
  iconColor: string;
  iconSize: number;
}

const SideContent: React.FC<SideContentProps> = ({
  icon,
  customContent,
  iconColor,
  iconSize
}) => {
  return (
    <>
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          color={iconColor}
          style={{ fontSize: iconSize }}
        />
      ) : (
        customContent
      )}
    </>
  );
};
