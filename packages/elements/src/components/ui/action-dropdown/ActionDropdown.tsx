import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
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
        dropdownBackground: theme.dropdownBackground
      }
    },
    [theme]
  );
  return (
    <Box position={"relative"} display={"inline-block"} width={width}>
      {expanded && (
        <Column
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          background={colors.dropdownBackground}
          borderColor={theme.borderColor}
          borderRadius={theme.borderRadius}
          borderWidth={1}
          borderStyle={"solid"}
        >
          <Row
            width={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
            height={theme.height}
            indent
          >
            <StandardText>{label}</StandardText>
            <Icon icon={faCaretDown} />
          </Row>
          {children}
        </Column>
      )}
      <Clickable onClick={open} disableFocusHighlight>
        <Box
          borderColor={theme.borderColor}
          borderRadius={theme.borderRadius}
          borderWidth={1}
          borderStyle={"solid"}
          background={colors.background}
          width={width}
        >
          <Row
            width={"100%"}
            height={theme.height}
            innerRef={ref}
            alignItems={"center"}
            justifyContent={"space-between"}
            indent
          >
            <StandardText>{label}</StandardText>
            <Icon icon={faCaretDown} />
          </Row>
        </Box>
      </Clickable>
    </Box>
  );
};
