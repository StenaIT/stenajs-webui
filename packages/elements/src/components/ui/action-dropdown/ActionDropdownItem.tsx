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
import {
  ActionDropdownTheme,
  defaultActionDropdownTheme
} from "./ActionDropdownTheme";

export interface ActionDropdownItemProps {
  label: string;
  text?: string;
  theme?: ActionDropdownTheme;
  icon?: IconDefinition;
  iconRight?: IconDefinition;
  disabled?: boolean;
  disableCloseOnClick?: boolean;
  onClick?: () => void;
}

export const ActionDropdownItem: React.FC<ActionDropdownItemProps> = ({
  label,
  icon,
  iconRight,
  text,
  theme = defaultActionDropdownTheme,
  disabled,
  onClick,
  children,
  disableCloseOnClick
}) => {
  const { close } = useContext(ActionDropdownContext);
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
        {text && <SmallerText color={colors.itemTextColor}>{text}</SmallerText>}
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
