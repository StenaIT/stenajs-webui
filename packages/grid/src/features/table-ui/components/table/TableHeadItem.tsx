import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { BoxProps, Heading, Row, Space } from "@stenajs-webui/core";
import { FlatButton, Icon, InputSpinner } from "@stenajs-webui/elements";
import { cssColor } from "@stenajs-webui/theme";
import {
  ButtonWithPopoverProps,
  Popover,
  Tooltip,
} from "@stenajs-webui/tooltip";
import * as React from "react";
import { CSSProperties, useRef } from "react";
import {
  SortOrderDirection,
  SortOrderIcon,
  SortOrderIconVariant,
} from "./SortOrderIcon";

export interface TableHeadProps extends BoxProps {
  label?: string;
  infoIconTooltipText?: string;
  popoverContent?: ButtonWithPopoverProps["children"];
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
              {label && <Heading variant={"h6"}>{label}</Heading>}
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
              variant={"outlined"}
              arrow={false}
            >
              <FlatButton leftIcon={faEllipsisV} size={"small"} />
            </Popover>
          ) : null}
        </Row>
      </Row>
    );
  }
);
