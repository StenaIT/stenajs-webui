import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Clickable,
  Row,
  SmallerText,
  Space,
  StandardText,
  useElementFocus,
  useMouseIsEntered,
  useThemeFields,
} from "@stenajs-webui/core";
import * as React from "react";
import { useCallback, useContext, useRef } from "react";
import { Icon } from "../icon/Icon";
import { ActionDropdownTheme } from "./ActionDropdownTheme";
import { ActionMenuContext } from "./ActionMenuContext";

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
  const { colors } = useThemeFields(
    {
      colors: {
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
      },
    },
    [theme, disabled, isInFocus, mouseIsOver]
  );

  const onClickHandler = useCallback(() => {
    if (close && !disableCloseOnClick) {
      close();
    }
    if (onClick) {
      onClick();
    }
  }, [onClick, close, disableCloseOnClick]);

  return (
    <Clickable
      onClick={disabled ? undefined : onClickHandler}
      disableFocusHighlight
      background={colors.itemBackground}
      innerRef={ref}
    >
      <Row
        height={theme.itemHeight}
        indent
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
          <StandardText color={colors.itemLabelColor}>{label}</StandardText>
        </Row>
        {rightText && (
          <SmallerText color={colors.itemTextColor}>{rightText}</SmallerText>
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
    </Clickable>
  );
};
