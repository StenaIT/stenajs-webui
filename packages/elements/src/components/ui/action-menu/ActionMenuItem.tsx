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
import { ActionDropdownTheme } from "./ActionDropdownTheme";
import { ActionMenuContext } from "./ActionMenuContext";
import styled from "@emotion/styled";

const BorderRadiusClickable = styled(Clickable)`
  &:first-child {
    border-radius: 4px 4px 0 0;
  }
  &:last-child {
    border-radius: 0 0 4px 4px;
  }
`;

export interface ActionMenuItemProps {
  label: string;
  rightText?: string;
  icon?: IconDefinition;
  theme?: ActionDropdownTheme;
  iconRight?: IconDefinition;
  disabled?: boolean;
  disableCloseOnClick?: boolean;
  onClick?: () => void;
}

export const ActionMenuItem: React.FC<ActionMenuItemProps> = ({
  label,
  icon,
  iconRight,
  rightText,
  disabled,
  onClick,
  theme: themeFromProps,
  children,
  disableCloseOnClick,
}) => {
  const { close, theme: themeFromContext } = useContext(ActionMenuContext);
  const theme = themeFromProps || themeFromContext;
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
              <Icon icon={icon} size={16} color={colors.iconColor} />
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
