import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons/faCaretUp";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import {
  Box,
  BoxProps,
  Row,
  SmallText,
  Space,
  useBoolean,
  useMouseIsEntered
} from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import {
  ButtonWithPopover,
  ButtonWithPopoverProps,
  Tooltip
} from "@stenajs-webui/tooltip";
import * as React from "react";
import { useRef } from "react";

export type ArrowType = "up" | "down";

export interface TableHeadProps extends BoxProps {
  label?: string;
  infoIconTooltipText?: string;
  popoverContent?: ButtonWithPopoverProps["children"];
  popoverButtonLoading?: boolean;
  arrow?: ArrowType;
  onClick?: () => void;
  selected?: boolean;
}

export const TableHeadItem: React.FC<TableHeadProps> = React.memo(
  ({
    label,
    arrow,
    onClick,
    children,
    selected,
    popoverContent,
    popoverButtonLoading,
    infoIconTooltipText,
    ...boxProps
  }) => {
    const ref = useRef(null);
    const mouseIsOver = useMouseIsEntered(ref);
    const [
      dialogueIsOpen,
      setDialogueIsOpen,
      setDialogueIsNotOpen
    ] = useBoolean(false);

    const popoverVisible =
      (mouseIsOver || dialogueIsOpen) &&
      (popoverContent || popoverButtonLoading);

    return (
      <Row
        onClick={onClick}
        height={"100%"}
        alignItems={"center"}
        style={onClick ? { cursor: "pointer", userSelect: "none" } : undefined}
        innerRef={ref}
        {...boxProps}
      >
        {infoIconTooltipText && (
          <div onClick={ev => ev.stopPropagation()}>
            <Tooltip label={infoIconTooltipText} zIndex={10}>
              <Icon
                icon={faInfoCircle}
                size={14}
                color={"var(--swui-primary-action-color)"}
              />
            </Tooltip>
          </div>
        )}
        {children && <Box indent>{children}</Box>}
        {label && (
          <Row indent alignItems={"center"}>
            {popoverVisible && (
              <>
                <ButtonWithPopover
                  onShow={setDialogueIsOpen}
                  onHide={setDialogueIsNotOpen}
                  leftIcon={faEllipsisV}
                  size={"small"}
                  loading={popoverButtonLoading}
                >
                  {popoverContent}
                </ButtonWithPopover>
                <Space />
              </>
            )}
            {label && (
              <SmallText fontWeight={"bold"} hoverUnderline={!!onClick}>
                {label}
              </SmallText>
            )}
          </Row>
        )}
        {arrow === "up" && (
          <>
            <Icon
              icon={faCaretUp}
              size={14}
              color={"var(--swui-primary-action-color-active)"}
            />
            <Space />
          </>
        )}
        {arrow === "down" && (
          <>
            <Icon
              icon={faCaretDown}
              size={14}
              color={"var(--swui-primary-action-color-active)"}
            />
            <Space />
          </>
        )}
      </Row>
    );
  }
);
