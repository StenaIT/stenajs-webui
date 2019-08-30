import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import {
  Box,
  Clickable,
  Column,
  Row,
  StandardText,
  useBoolean,
  useOnClickOutside,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";
import { useRef } from "react";
import { Icon } from "../icon/Icon";
import {
  ActionDropdownTheme,
  defaultActionDropdownTheme
} from "./ActionDropdownTheme";

interface ActionDropdownProps {
  width?: string;
  label?: string;
  theme?: ActionDropdownTheme;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  children,
  width = "150px",
  label = "Actions",
  theme = defaultActionDropdownTheme
}) => {
  const [expanded, open, close] = useBoolean(false);
  const ref = useRef(null);
  useOnClickOutside(ref, close);

  const { colors } = useThemeFields(
    {
      colors: {
        textColor: theme.textColor,
        background: theme.background,
        borderColor: theme.borderColor,
        borderColorHover: theme.borderColorHover,
        dropdownBackground: theme.dropdownBackground
      }
    },
    [theme]
  );

  const hoverBorder = `1px solid ${colors.borderColorHover}`;

  return (
    <Box
      position={"relative"}
      display={"inline-block"}
      width={width}
      innerRef={ref}
    >
      {expanded && (
        <Column
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          background={colors.dropdownBackground}
          borderColor={colors.borderColorHover}
          borderRadius={theme.borderRadius}
          borderWidth={1}
          borderStyle={"solid"}
        >
          <Row
            width={"100%"}
            height={theme.height}
            justifyContent={"space-between"}
            alignItems={"center"}
            indent
          >
            <StandardText>{label}</StandardText>
            <Icon icon={faChevronUp} size={12} />
          </Row>
          <Column spacing={0.5}>{children}</Column>
        </Column>
      )}
      <Clickable onClick={open} disableFocusHighlight>
        <Box
          borderColor={colors.borderColor}
          hoverBorder={hoverBorder}
          borderRadius={theme.borderRadius}
          borderWidth={1}
          borderStyle={"solid"}
          background={colors.background}
          width={width}
          height={theme.height}
        >
          <Row
            width={"100%"}
            height={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
            indent
          >
            <StandardText>{label}</StandardText>
            <Icon icon={expanded ? faChevronUp : faChevronDown} size={12} />
          </Row>
        </Box>
      </Clickable>
    </Box>
  );
};
