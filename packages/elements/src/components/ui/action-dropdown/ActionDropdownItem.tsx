import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Row, StandardText, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import { Indent } from "../../../../../core/src/components/layout/indent/Indent";
import { SmallText } from "../../../../../core/src/components/text/variants/SmallText";
import { Icon } from "../icon/Icon";
import {
  ActionDropdownTheme,
  defaultActionDropdownTheme
} from "./ActionDropdownTheme";

interface ActionDropdownItemProps {
  label: string;
  text?: string;
  theme?: ActionDropdownTheme;
  icon?: IconDefinition;
}

export const ActionDropdownItem: React.FC<ActionDropdownItemProps> = ({
  label,
  icon,
  text,
  theme = defaultActionDropdownTheme
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        textColor: theme.textColor,
        background: theme.background
      }
    },
    [theme]
  );
  return (
    <Row
      height={theme.itemHeight}
      indent
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Row height={theme.itemHeight} alignItems={"center"}>
        {icon && (
          <Indent>
            <Icon icon={icon} size={16} />
          </Indent>
        )}
        <StandardText color={colors.textColor}>{label}</StandardText>
        {text && <SmallText color={colors.textColor}>{label}</SmallText>}
      </Row>
    </Row>
  );
};
