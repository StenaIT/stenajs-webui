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
import { KeyboardEventHandler, useCallback, useMemo, useRef } from "react";
import { Icon } from "../icon/Icon";
import {
  ActionDropdownTheme,
  defaultActionDropdownTheme
} from "./ActionDropdownTheme";
import { ActionMenu } from "./ActionMenu";
import { ActionMenuContext } from "./ActionMenuContext";
import { faChevronUp } from "@fortawesome/pro-light-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/pro-light-svg-icons/faChevronDown";

interface ActionDropdownProps {
  width?: string;
  label?: string;
  disabled?: boolean;
  theme?: ActionDropdownTheme;
  zIndexOnMenu?: number;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  children,
  disabled,
  width = "180px",
  label = "Actions",
  theme = defaultActionDropdownTheme,
  zIndexOnMenu
}) => {
  const [expanded, open, close] = useBoolean(false);
  const ref = useRef(null);
  const clickableRef = useRef<HTMLButtonElement>(null);
  const mouseIsOver = useMouseIsEntered(ref);
  useOnClickOutside(ref, close);

  const { colors } = useThemeFields(
    {
      colors: {
        textColor: disabled ? theme.textColorDisabled : theme.textColor,
        background: disabled ? theme.backgroundDisabled : theme.background,
        borderColor: theme.borderColor,
        borderColorFocus: theme.borderColorFocus,
        expandIconColor: theme.expandIconColor,
        expandIconColorDisabled: theme.expandIconColorDisabled,
        expandIconColorFocus: theme.expandIconColorFocus
      }
    },
    [theme, disabled]
  );

  const hoverBorder = useMemo(() => `1px solid ${colors.borderColorFocus}`, [
    colors.borderColorFocus
  ]);

  const closeAndRefocus = useCallback(() => {
    close();
    clickableRef.current!.focus();
  }, [close, clickableRef]);

  const onKeyDownHandler = useCallback<KeyboardEventHandler>(
    ev => {
      const { key } = ev;
      if (key === "Escape") {
        closeAndRefocus();
        ev.stopPropagation();
        ev.preventDefault();
      }
      if (key === "ArrowDown") {
        open();
        ev.stopPropagation();
        ev.preventDefault();
      }
    },
    [open, closeAndRefocus]
  );

  const contextValue = useMemo(
    () => ({ open, close: closeAndRefocus, theme }),
    [open, closeAndRefocus, theme]
  );

  return (
    <ActionMenuContext.Provider value={contextValue}>
      <Box
        position={"relative"}
        display={"inline-block"}
        width={width}
        innerRef={ref}
        onKeyDown={onKeyDownHandler}
      >
        <Clickable
          onClick={!disabled ? open : undefined}
          disableFocusHighlight={expanded}
          innerRef={clickableRef}
          borderRadius={theme.borderRadius}
        >
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
                    ? colors.expandIconColorFocus
                    : colors.expandIconColor
                }
              />
            </Row>
          </Box>
        </Clickable>
        {expanded && (
          <Column
            position={"absolute"}
            top={0}
            left={0}
            right={0}
            zIndex={zIndexOnMenu}
          >
            <ActionMenu
              width={width}
              shadow={"modal"}
              top={
                <Clickable width={"100%"} onClick={closeAndRefocus}>
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
                      color={colors.expandIconColorFocus}
                    />
                  </Row>
                </Clickable>
              }
            >
              {children}
            </ActionMenu>
          </Column>
        )}
      </Box>
    </ActionMenuContext.Provider>
  );
};
