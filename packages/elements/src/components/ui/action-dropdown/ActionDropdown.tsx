import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import {
  Box,
  Clickable,
  Column,
  Row,
  StandardText,
  useBoolean,
  useMouseIsEntered,
  useOnClickOutside,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";
import { useRef } from "react";
import { Icon } from "../icon/Icon";
import { ActionDropdownContext } from "./ActionDropdownContext";
import {
  ActionDropdownTheme,
  defaultActionDropdownTheme
} from "./ActionDropdownTheme";

interface ActionDropdownProps {
  width?: string;
  label?: string;
  disabled?: boolean;
  theme?: ActionDropdownTheme;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  children,
  disabled,
  width = "180px",
  label = "Actions",
  theme = defaultActionDropdownTheme
}) => {
  const [expanded, open, close] = useBoolean(false);
  const ref = useRef(null);
  const mouseIsOver = useMouseIsEntered(ref);
  useOnClickOutside(ref, close);

  const { colors } = useThemeFields(
    {
      colors: {
        textColor: disabled ? theme.textColorDisabled : theme.textColor,
        background: disabled ? theme.backgroundDisabled : theme.background,
        borderColor: theme.borderColor,
        borderColorHover: theme.borderColorHover,
        dropdownBackground: theme.dropdownBackground,
        expandIconColor: theme.expandIconColor,
        expandIconColorDisabled: theme.expandIconColorDisabled,
        expandIconColorHover: theme.expandIconColorHover
      }
    },
    [theme, disabled]
  );

  const hoverBorder = `1px solid ${colors.borderColorHover}`;

  return (
    <ActionDropdownContext.Provider value={{ open, close, theme }}>
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
            shadow={"modal"}
          >
            <Row
              width={"100%"}
              height={theme.height}
              justifyContent={"space-between"}
              alignItems={"center"}
              indent
            >
              <StandardText>{label}</StandardText>
              <Icon
                icon={faChevronUp}
                size={12}
                color={colors.expandIconColorHover}
              />
            </Row>
            <Column spacing={0.5}>{children}</Column>
          </Column>
        )}
        <Clickable onClick={!disabled ? open : undefined} disableFocusHighlight>
          <Box
            borderColor={colors.borderColor}
            hoverBorder={disabled ? undefined : hoverBorder}
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
              <StandardText color={colors.textColor}>{label}</StandardText>
              <Icon
                icon={expanded ? faChevronUp : faChevronDown}
                size={12}
                color={
                  disabled
                    ? colors.expandIconColorDisabled
                    : mouseIsOver
                    ? colors.expandIconColorHover
                    : colors.expandIconColor
                }
              />
            </Row>
          </Box>
        </Clickable>
      </Box>
    </ActionDropdownContext.Provider>
  );
};
