import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { BoxProps, Row, Space, Text } from "@stenajs-webui/core";
import { FlatButton, Icon, InputSpinner } from "@stenajs-webui/elements";
import {
  ButtonWithPopoverProps,
  Popover,
  Tooltip,
} from "@stenajs-webui/tooltip";
import * as React from "react";
import { CSSProperties, useRef } from "react";
import { faLongArrowAltDown } from "@fortawesome/free-solid-svg-icons/faLongArrowAltDown";
import { faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons/faLongArrowAltUp";
import { cssColor } from "@stenajs-webui/theme";

export type ArrowType = "up" | "down";

export interface TableHeadProps extends BoxProps {
  label?: string;
  infoIconTooltipText?: string;
  popoverContent?: ButtonWithPopoverProps["children"];
  loading?: boolean;
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
    loading,
    infoIconTooltipText,
    overflow = "hidden",
    ...boxProps
  }) => {
    const containerRef = useRef(null);

    const cursorStyle = onClick
      ? ({ cursor: "pointer", userSelect: "none" } as CSSProperties)
      : undefined;

    const hasOnlyChildren = !label && !arrow && !infoIconTooltipText;

    return (
      <Row
        height={"100%"}
        alignItems={"center"}
        innerRef={containerRef}
        overflow={overflow}
        justifyContent={"space-between"}
        indent
        border={"1px solid transparent"}
        {...boxProps}
      >
        <Row alignItems={"center"}>
          {(children || label) && (
            <Row onClick={onClick} style={cursorStyle} alignItems={"center"}>
              {children && (
                <>
                  {children}
                  {!hasOnlyChildren && <Space num={0.5} />}
                </>
              )}
              {label && (
                <>
                  <Text variant={"bold"}>{label}</Text>
                  <Space num={0.5} />
                </>
              )}
              {arrow && (
                <>
                  <Icon
                    size={14}
                    color={cssColor("--lhds-color-blue-500")}
                    icon={
                      arrow === "up" ? faLongArrowAltUp : faLongArrowAltDown
                    }
                  />
                  <Space />
                </>
              )}
            </Row>
          )}

          {infoIconTooltipText && (
            <>
              <Space num={0.5} />
              <Row onClick={(ev) => ev.stopPropagation()}>
                <Tooltip
                  label={infoIconTooltipText}
                  zIndex={"var(--swui-sticky-popover-z-index)" as any}
                >
                  <Icon
                    icon={faInfoCircle}
                    size={14}
                    color={cssColor("--lhds-color-blue-400")}
                  />
                </Tooltip>
                <Space />
              </Row>
            </>
          )}
        </Row>

        <Row>
          {loading ? (
            <InputSpinner />
          ) : popoverContent ? (
            <Popover
              content={popoverContent}
              trigger={"click"}
              zIndex={1000}
              disablePadding
              arrow
            >
              <FlatButton leftIcon={faEllipsisV} size={"small"} />
            </Popover>
          ) : null}
        </Row>
      </Row>
    );
  }
);
