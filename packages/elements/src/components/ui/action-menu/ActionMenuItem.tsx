import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Clickable,
  Row,
  Space,
  Text,
  useElementFocus,
  useMouseIsEntered,
} from "@stenajs-webui/core";
import * as React from "react";
import { useCallback, useContext, useRef } from "react";
import { Icon } from "../icon/Icon";
import { ActionMenuContext } from "./ActionMenuContext";
import styled from "@emotion/styled";
import { ActionMenuTheme, dangerActionMenuTheme } from "./ActionMenuTheme";

interface BorderRadiusClickableProps {
  styledBorderRadius: ActionMenuTheme["borderRadius"];
}

const BorderRadiusClickable = styled(Clickable)<BorderRadiusClickableProps>`
  ${(props) =>
    props.styledBorderRadius
      ? `
    &:first-child {
      border-radius: ${props.styledBorderRadius} ${props.styledBorderRadius} 0 0;
    }
    &:last-child {
      border-radius: 0 0 ${props.styledBorderRadius} ${props.styledBorderRadius};
    }
  `
      : ""}
`;

export type ActionMenuItemVariant = "danger";

function themeFromVariant(variant?: ActionMenuItemVariant) {
  switch (variant) {
    case "danger":
      return dangerActionMenuTheme;
    default:
      return null;
  }
}

export interface ActionMenuItemProps {
  label: string;
  variant?: ActionMenuItemVariant;
  rightText?: string;
  icon?: IconDefinition;
  iconRight?: IconDefinition;
  disabled?: boolean;
  disableCloseOnClick?: boolean;
  onClick?: () => void;
}

export const ActionMenuItem: React.FC<ActionMenuItemProps> = ({
  label,
  variant,
  icon,
  iconRight,
  rightText,
  disabled,
  onClick,
  children,
  disableCloseOnClick,
}) => {
  const { close, theme: themeFromContext } = useContext(ActionMenuContext);
  const theme = themeFromVariant(variant) || themeFromContext;
  const ref = useRef<HTMLButtonElement>(null);
  const { isInFocus } = useElementFocus(ref);
  const mouseIsOver = useMouseIsEntered(ref);

  const colors = {
    iconColor: disabled
      ? theme.iconColorDisabled
      : mouseIsOver
      ? theme.iconColorHover
      : isInFocus
      ? theme.iconColorFocus
      : theme.iconColor,
    itemLabelColor: disabled
      ? theme.itemLabelColorDisabled
      : mouseIsOver
      ? theme.itemLabelColorHover
      : isInFocus
      ? theme.itemLabelColorFocus
      : theme.itemLabelColor,
    itemTextColor: disabled
      ? theme.itemTextColorDisabled
      : mouseIsOver
      ? theme.itemTextColorHover
      : isInFocus
      ? theme.itemTextColorFocus
      : theme.itemTextColor,
    itemBackground:
      disabled && isInFocus
        ? theme.itemBackgroundDisabledFocus
        : disabled
        ? theme.itemBackgroundDisabled
        : mouseIsOver
        ? theme.itemBackgroundHover
        : isInFocus
        ? theme.itemBackgroundFocus
        : theme.itemBackground,
  };

  const onClickHandler = useCallback(() => {
    if (close && !disableCloseOnClick) {
      close();
    }
    if (onClick) {
      onClick();
    }
  }, [onClick, close, disableCloseOnClick]);

  return (
    <BorderRadiusClickable
      styledBorderRadius={theme.borderRadius}
      onClick={disabled ? undefined : onClickHandler}
      disableFocusHighlight
      background={colors.itemBackground}
      ref={ref}
    >
      <Row
        height={theme.itemHeight}
        indent={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Row height={theme.itemHeight} alignItems={"center"}>
          {icon && (
            <>
              <Icon icon={icon} fixedWidth size={16} color={colors.iconColor} />
              <Space />
            </>
          )}
          <Text color={colors.itemLabelColor}>{label}</Text>
        </Row>
        {rightText && (
          <Text size={"smaller"} color={colors.itemTextColor}>
            {rightText}
          </Text>
        )}
        {children && (
          <>
            <Space />
            {children}
          </>
        )}
        {iconRight && (
          <>
            <Space />
            <Icon icon={iconRight} size={14} color={colors.itemLabelColor} />
          </>
        )}
      </Row>
    </BorderRadiusClickable>
  );
};
