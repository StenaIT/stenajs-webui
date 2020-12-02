import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  AnchorElementProps,
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
import styles from "./ActionMenuLink.module.css";

export interface ActionMenuLinkProps extends AnchorElementProps {
  label: string;
  rightText?: string;
  icon?: IconDefinition;
  theme?: ActionDropdownTheme;
  iconRight?: IconDefinition;
  disabled?: boolean;
  disableCloseOnClick?: boolean;
  onClick?: () => void;
}

export const ActionMenuLink: React.FC<ActionMenuLinkProps> = ({
  label,
  icon,
  iconRight,
  rightText,
  disabled,
  onClick,
  theme: themeFromProps,
  children,
  disableCloseOnClick,
  href,
  ...anchorProps
}) => {
  const { close, theme: themeFromContext } = useContext(ActionMenuContext);
  const theme = themeFromProps || themeFromContext;
  const ref = useRef<HTMLAnchorElement>(null);
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
    <a
      onClick={disabled ? undefined : onClickHandler}
      aria-disabled={disabled}
      href={disabled ? undefined : href}
      ref={ref}
      style={{ background: colors.itemBackground }}
      className={styles.actionMenuLink}
      {...anchorProps}
    >
      <Row
        height={theme.itemHeight}
        indent
        alignItems={"center"}
        justifyContent={"space-between"}
        background={colors.itemBackground}
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
          <Text size={"small"} color={colors.itemTextColor}>
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
    </a>
  );
};
