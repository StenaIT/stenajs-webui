import styled from "@emotion/styled";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode, useMemo } from "react";
import { Progress } from "../../progress/Progress";
import { ButtonProps, ButtonTextProps } from "../Button";
import { defaultButtonTheme } from "../ButtonTheme";

export const useButtonContents = ({
  buttonTheme = defaultButtonTheme,
  disabled,
  success,
  successLabel,
  label,
  loading,
  loadingLabel,
  left,
  leftIcon,
  right,
  rightIcon,
  iconSize = 14
}: ButtonProps) => {
  const { colors, fonts, fontSizes } = useThemeFields(
    {
      colors: {
        textColor: buttonTheme.textColor,
        textColorDisabled: buttonTheme.textColorDisabled,
        bgColor: buttonTheme.bgColor,
        bgColorDisabled: buttonTheme.bgColorDisabled,
        successIconColor: buttonTheme.successIconColor,
        successTextColor: buttonTheme.successTextColor,
        loadingSpinnerColor: buttonTheme.loadingSpinnerColor,
        loadingTextColor: buttonTheme.loadingTextColor
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

  const textColor = disabled ? colors.textColorDisabled : colors.textColor;

  return useMemo(() => {
    if (success) {
      const successIcon = (
        <FontAwesomeIcon
          icon={faCheck}
          color={colors.successIconColor}
          style={{ fontSize: 20 }}
        />
      );

      if (successLabel) {
        return {
          leftContent: successIcon,
          centerContent: (
            <ButtonText
              color={colors.successTextColor}
              fontSize={fontSizes.fontSize}
              fontFamily={fonts.font}
            >
              {successLabel}
            </ButtonText>
          )
        };
      }
      return { centerContent: successIcon };
    }
    if (loading) {
      const loadingIcon = (
        <Progress size={"24px"} trackColor={colors.loadingSpinnerColor} />
      );
      if (loadingLabel) {
        return {
          leftContent: loadingIcon,
          centerContent: (
            <ButtonText
              color={colors.loadingTextColor}
              fontSize={fontSizes.fontSize}
              fontFamily={fonts.font}
            >
              {loadingLabel}
            </ButtonText>
          )
        };
      }
      return { centerContent: loadingIcon };
    }
    const leftSide =
      leftIcon || left ? (
        <SideContent
          icon={leftIcon}
          customContent={left}
          iconSize={iconSize}
          iconColor={textColor}
        />
      ) : null;

    const rightSide =
      rightIcon || right ? (
        <SideContent
          icon={rightIcon}
          customContent={right}
          iconSize={iconSize}
          iconColor={textColor}
        />
      ) : null;

    if (!label) {
      if (leftIcon || left) {
        return {
          centerContent: leftSide
        };
      }
      if (rightIcon || right) {
        return {
          centerContent: rightSide
        };
      }
    }
    return {
      leftContent: leftSide,
      centerContent: (
        <ButtonText
          color={textColor}
          fontSize={fontSizes.fontSize}
          fontFamily={fonts.font}
        >
          {label}
        </ButtonText>
      ),
      rightContent: rightSide
    };
  }, [
    buttonTheme,
    disabled,
    success,
    successLabel,
    label,
    loading,
    loadingLabel,
    left,
    leftIcon,
    right,
    rightIcon,
    iconSize
  ]);
};

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
