import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Clickable,
  Row,
  SmallerText,
  Space,
  StandardText,
  useMouseIsEntered,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";
import { useContext, useRef } from "react";
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
  const { close, theme: themeFromContext } = useContext(ActionDropdownContext);
  const theme = themeFromProps || themeFromContext;
  const ref = useRef(null);
  const mouseIsOver = useMouseIsEntered(ref);
  const { colors } = useThemeFields(
    {
      colors: {
        iconColor: disabled
          ? theme.iconColorDisabled
          : mouseIsOver
          ? theme.iconColorHover
          : theme.iconColor,
        itemLabelColor: disabled
          ? theme.itemLabelColorDisabled
          : mouseIsOver
          ? theme.itemLabelColorHover
          : theme.itemLabelColor,
        itemTextColor: disabled
          ? theme.itemTextColorDisabled
          : mouseIsOver
          ? theme.itemTextColorHover
          : theme.itemTextColor,
        itemBackground: disabled
          ? theme.itemBackgroundDisabled
          : mouseIsOver
          ? theme.itemBackgroundHover
          : theme.itemBackground
      }
    },
    [theme, disabled, mouseIsOver]
  );

  const onClickHandler = () => {
    if (close && !disableCloseOnClick) {
      close();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <Clickable
      onClick={disabled ? undefined : onClickHandler}
      disableFocusHighlight
    >
      <Row
        height={theme.itemHeight}
        indent
        alignItems={"center"}
        justifyContent={"space-between"}
        background={colors.itemBackground}
        innerRef={ref}
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
