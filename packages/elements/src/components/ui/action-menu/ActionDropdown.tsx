import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import {
  Box,
  Clickable,
  Column,
  Row,
  Text,
  useBoolean,
  useMouseIsEntered,
  useOnClickOutside,
} from "@stenajs-webui/core";
import * as React from "react";
import { KeyboardEventHandler, useCallback, useMemo, useRef } from "react";
import { Icon } from "../icon/Icon";
import { defaultActionDropdownTheme } from "./ActionDropdownTheme";
import { ActionMenu } from "./ActionMenu";
import { ActionMenuContext } from "./ActionMenuContext";

export interface ActionDropdownProps {
  width?: string;
  label?: string;
  disabled?: boolean;
  zIndexOnMenu?: number;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  children,
  disabled = false,
  width = "180px",
  label = "Actions",
  zIndexOnMenu,
}) => {
  const [expanded, open, close] = useBoolean(false);
  const ref = useRef(null);
  const clickableRef = useRef<HTMLButtonElement>(null);
  const mouseIsOver = useMouseIsEntered(ref);
  useOnClickOutside(ref, close);

  const colors = {
    textColor: disabled
      ? defaultActionDropdownTheme.textColorDisabled
      : defaultActionDropdownTheme.textColor,
    background: disabled
      ? defaultActionDropdownTheme.backgroundDisabled
      : defaultActionDropdownTheme.background,
    borderColor: defaultActionDropdownTheme.borderColor,
    borderColorFocus: defaultActionDropdownTheme.borderColorFocus,
    expandIconColor: defaultActionDropdownTheme.expandIconColor,
    expandIconColorDisabled: defaultActionDropdownTheme.expandIconColorDisabled,
    expandIconColorFocus: defaultActionDropdownTheme.expandIconColorFocus,
  };

  const hoverBorder = useMemo(() => `1px solid ${colors.borderColorFocus}`, [
    colors.borderColorFocus,
  ]);

  const closeAndRefocus = useCallback(() => {
    close();
    clickableRef.current!.focus();
  }, [close, clickableRef]);

  const onKeyDownHandler = useCallback<KeyboardEventHandler>(
    (ev) => {
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
    () => ({ open, close: closeAndRefocus, theme: defaultActionDropdownTheme }),
    [open, closeAndRefocus]
  );

  return (
    <ActionMenuContext.Provider value={contextValue}>
      <Box
        position={"relative"}
        display={"inline-block"}
        width={width}
        ref={ref}
        onKeyDown={onKeyDownHandler}
      >
        <Clickable
          onClick={!disabled ? open : undefined}
          disableFocusHighlight={expanded}
          ref={clickableRef}
          borderRadius={defaultActionDropdownTheme.borderRadius}
        >
          <Box
            borderColor={colors.borderColor}
            hoverBorder={disabled ? undefined : hoverBorder}
            borderRadius={defaultActionDropdownTheme.borderRadius}
            borderWidth={1}
            borderStyle={"solid"}
            background={colors.background}
            width={width}
            height={defaultActionDropdownTheme.height}
          >
            <Row
              width={"100%"}
              height={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
              indent
            >
              <Text color={colors.textColor}>{label}</Text>
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
                    height={defaultActionDropdownTheme.height}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    indent
                  >
                    <Text>{label}</Text>
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
