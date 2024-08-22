import { Box, BoxProps, Heading, Row, Space } from "@stenajs-webui/core";
import {
  FlatButton,
  Icon,
  InputSpinner,
  stenaDotsVertical,
  stenaInfoCircle,
} from "@stenajs-webui/elements";
import { cssColor } from "@stenajs-webui/theme";
import { Popover, Tooltip } from "@stenajs-webui/tooltip";
import * as React from "react";
import { CSSProperties, ReactNode, useRef } from "react";
import {
  SortOrderDirection,
  SortOrderIcon,
  SortOrderIconVariant,
} from "./SortOrderIcon";

export interface TableHeadProps extends BoxProps {
  label?: string;
  infoIconTooltipText?: string;
  popoverContent?: ReactNode;
  loading?: boolean;
  arrow?: SortOrderDirection;
  onClick?: () => void;
  selected?: boolean;
  alignRight?: boolean;
  sortOrderIconVariant?: SortOrderIconVariant;
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
    alignRight,
    sortOrderIconVariant,
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
        ref={containerRef}
        overflow={overflow}
        justifyContent={alignRight ? "flex-end" : "flex-start"}
        borderTop={"2px solid transparent"}
        borderBottom={`2px solid ${
          selected ? cssColor("--lhds-color-blue-500") : "transparent"
        }`}
        {...boxProps}
      >
        <Row alignItems={"center"} indent>
          {!arrow && alignRight && (
            <>
              <Space />
              <Box width={"14px"} />
              <Space num={0.5} />
            </>
          )}

          {(children || label) && (
            <Row onClick={onClick} style={cursorStyle} alignItems={"center"}>
              {children && (
                <>
                  {children}
                  {!hasOnlyChildren && <Space num={0.5} />}
                </>
              )}
              {arrow && alignRight && (
                <>
                  <Space />
                  <SortOrderIcon
                    direction={arrow}
                    iconVariant={sortOrderIconVariant}
                  />
                  <Space num={0.5} />
                </>
              )}
              {label && (
                <Heading variant={"h6"} style={{ textAlign: "left" }}>
                  {label}
                </Heading>
              )}
              {arrow && !alignRight && (
                <>
                  <Space num={0.5} />
                  <SortOrderIcon
                    direction={arrow}
                    iconVariant={sortOrderIconVariant}
                  />
                  <Space />
                </>
              )}
            </Row>
          )}

          {infoIconTooltipText && (
            <>
              <Space />
              <Row onClick={(ev) => ev.stopPropagation()}>
                <Tooltip label={infoIconTooltipText}>
                  <Icon
                    icon={stenaInfoCircle}
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
              renderTrigger={(props) => (
                <FlatButton
                  leftIcon={stenaDotsVertical}
                  size={"small"}
                  {...props}
                />
              )}
              trigger={"click"}
              disablePadding
            >
              {popoverContent}
            </Popover>
          ) : null}
        </Row>

        {!arrow && !alignRight && (
          <>
            <Space />
            <Box width={"14px"} />
            <Space num={0.5} />
          </>
        )}
      </Row>
    );
  }
);
