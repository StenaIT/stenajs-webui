import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Clickable,
  Row,
  SmallerText,
  Space,
  StandardText,
  useElementFocus,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";
import { useCallback, useContext, useRef } from "react";
import { Icon } from "../icon/Icon";
import { ActionDropdownContext } from "./ActionDropdownContext";
import { ActionDropdownTheme } from "./ActionDropdownTheme";

export interface ActionDropdownItemProps {
  label: string;
  rightText?: string;
  icon?: IconDefinition;
  theme?: ActionDropdownTheme;
  iconRight?: IconDefinition;
  disabled?: boolean;
  disableCloseOnClick?: boolean;
  onClick?: () => void;
}

export const ActionDropdownItem: React.FC<ActionDropdownItemProps> = ({
  label,
  icon,
  iconRight,
  rightText,
  disabled,
  onClick,
  theme: themeFromProps,
  children,
  disableCloseOnClick
}) => {
  const { close, theme: themeFromContext, onUpPress, onDownPress } = useContext(
    ActionDropdownContext
  );
  const theme = themeFromProps || themeFromContext;
  const ref = useRef<HTMLButtonElement>(null);
  const { isInFocus, focus } = useElementFocus(ref);
  if (isInFocus) {
    console.log("-------------------- isInFocus!!", isInFocus);
  }
  const { colors } = useThemeFields(
    {
      colors: {
        iconColor: disabled
          ? theme.iconColorDisabled
          : isInFocus
          ? theme.iconColorFocus
          : theme.iconColor,
        itemLabelColor: disabled
          ? theme.itemLabelColorDisabled
          : isInFocus
          ? theme.itemLabelColorFocus
          : theme.itemLabelColor,
        itemTextColor: disabled
          ? theme.itemTextColorDisabled
          : isInFocus
          ? theme.itemTextColorFocus
          : theme.itemTextColor,
        itemBackground: disabled
          ? theme.itemBackgroundDisabled
          : isInFocus
          ? theme.itemBackgroundFocus
          : theme.itemBackground
      }
    },
    [theme, disabled, isInFocus]
  );

  const onClickHandler = useCallback(() => {
    if (close && !disableCloseOnClick) {
      close();
    }
    if (onClick) {
      onClick();
    }
  }, [onClick, close, disableCloseOnClick]);

  const onKeyHandler = useCallback(
    ev => {
      const { key } = ev;
      if (key === "ArrowUp" && onUpPress) {
        onUpPress();
      }
      if (key === "ArrowDown" && onDownPress) {
        onDownPress();
      }
    },
    [onUpPress, onDownPress]
  );

  return (
    <Clickable
      onClick={disabled ? undefined : onClickHandler}
      disableFocusHighlight
      background={colors.itemBackground}
      innerRef={ref}
      onMouseEnter={focus}
      tabIndex={disabled ? -1 : undefined}
      onKeyDown={onKeyHandler}
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
